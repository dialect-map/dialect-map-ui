/* encoding: utf-8 */

import config from "../config";

const configRespPrefix = "world_index(";
const configRespSuffix = ")";

export default class ConfigLoader {
    /** Class to load the initial map configuration from Paperscape */

    static _calcWorldToViewScale(tilePixels, tilePixelsAtZ0) {
        return tilePixels / tilePixelsAtZ0;
    }

    static _calcViewToWorldScale(tilePixels, tilePixelsAtZ0) {
        return tilePixelsAtZ0 / tilePixels;
    }

    static _handlePaperIDResp(text) {
        let body = this._pruneWorldConfigResp(text);
        return JSON.parse(body);
    }

    static _pruneWorldConfigResp(body) {
        let startStr = configRespPrefix.length;
        let finishStr = body.length - configRespSuffix.length;
        return body.substring(startStr, finishStr);
    }

    static _updateConfig(conf) {
        config.worldMinX = conf["xmin"];
        config.worldMaxX = conf["xmax"];
        config.worldMinY = conf["ymin"];
        config.worldMaxY = conf["ymax"];
        config.worldTileSize = conf["pixelw"];

        /* IMPORTANT NOTE:
         *
         * Leaflet "Simple" CRS supposes a 1:1 ratio
         * Between tile pixels and world pixels at zoom 0.
         * As it is not the case, scaling need to be performed
         */
        config.viewToWorldScale = this._calcViewToWorldScale(
            conf["pixelw"],
            conf["tilings"][0]["tw"]
        );
        config.worldToViewScale = this._calcWorldToViewScale(
            conf["pixelw"],
            conf["tilings"][0]["tw"]
        );
    }

    static async loadPaperscapeConfig() {
        console.log("Loading PaperScape configuration...");

        let conf = await fetch(config.worldConfigURL, {})
            .then(resp => resp.text())
            .then(text => this._handlePaperIDResp(text));

        this._updateConfig(conf);
        console.log("PaperScape configuration loaded");
    }
}
