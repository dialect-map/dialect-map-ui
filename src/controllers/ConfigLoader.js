/* encoding: utf-8 */

import config from "../config";


const configRespPrefix = "world_index(";
const configRespSuffix = ")";


export default class ConfigLoader {


    static stringDecoder = new TextDecoder("utf-8");


    static _handlePaperIDResp(resp) {
        let reader = resp.body.getReader();
        return reader.read()
    }


    static _pruneWorldConfigResp(body) {
        let startStr  = configRespPrefix.length;
        let finishStr = body.length - configRespSuffix.length;
        return body.substring(startStr, finishStr);
    }


    static async loadPaperscapeConfig() {
        console.log("Loading PaperScape configuration...");

        let url  = config.worldMandatoryProxy + "/" + config.worldConfigURL;
        let resp = await fetch(url, {});
        let text = await this._handlePaperIDResp(resp);

        let body = this.stringDecoder.decode(text.value);
        let json = this._pruneWorldConfigResp(body);
        let conf = JSON.parse(json);

        config.worldMinX = conf["xmin"];
        config.worldMaxX = conf["xmax"];
        config.worldMinY = conf["ymin"];
        config.worldMaxY = conf["ymax"];
        config.tileRealPixelsSize = conf["pixelw"];
        config.tileWorldPixelsAtZ0 = conf["tilings"][0]["tw"];

        console.log("PaperScape configuration loaded")
    }
}
