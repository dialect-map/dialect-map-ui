/* encoding: utf-8 */

import config from "../../../../config";

const mapLabelsRespPrefix = "lz_Z_X_Y(";
const mapLabelsRespSuffix = ")";

export default class MapLabelsCtl {
    /** Controller defining the map labels queries to the Paperscape API */

    static fetchLabels(zoomLevel, centerPos) {
        let labelSpec = config.worldLabels[zoomLevel];
        let labelsXTile = this._getLabelTile(
            centerPos[0],
            config.worldMinX,
            config.worldMaxX,
            labelSpec.nx
        );
        let labelsYTile = this._getLabelTile(
            centerPos[1],
            config.worldMinY,
            config.worldMaxY,
            labelSpec.ny
        );

        // prettier-ignore
        let url = config.labelsJsonHost
            + "/" + zoomLevel
            + "/" + labelsXTile
            + "/" + labelsYTile
            + ".json";

        return fetch(url, {})
            .then(resp => resp.text())
            .then(text => this._handleLabelsResp(text))
            .catch(err => console.log(err));
    }

    static _getLabelTile(coord, coordMin, coordMax, tilesNum) {
        let chunkSize = (coordMax - coordMin) / tilesNum;
        let highBound = coordMin + chunkSize;
        let tileIndex = 1;

        while (coord >= highBound) {
            highBound += chunkSize;
            tileIndex += 1;
        }

        return tileIndex;
    }

    static _handleLabelsResp(text) {
        let body = this._pruneLabelsResp(text);
        let json = JSON.parse(body);
        return json["lbls"];
    }

    static _pruneLabelsResp(body) {
        return body.slice(
            +1 * mapLabelsRespPrefix.length,
            -1 * mapLabelsRespSuffix.length
        );
    }
}
