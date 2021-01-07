/* encoding: utf-8 */

import config from "../../../../config"


const labelsRespPrefix = "lz_Z_X_Y(";
const labelsRespSuffix = ")";


export default class MapLabelsCtl {
    /** Controller defining the map labels queries to the Paperscape API */


    static fetchLabels(zoomLevel, centerPos) {

        let labelSpec   = config.worldLabels[zoomLevel];
        let labelsXTile = this._getLabelTile(centerPos[0], config.worldMinX, config.worldMaxX, labelSpec.nx);
        let labelsYTile = this._getLabelTile(centerPos[1], config.worldMinY, config.worldMaxY, labelSpec.ny);

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
        let upperBound = coordMin;
        let tileIndex = 1;

        while (true) {
            upperBound += chunkSize;
            if (coord < upperBound) {
                break
            } else {
                tileIndex += 1;
            }
        }

        return tileIndex;
    }


    static _handleLabelsResp(text) {
        let body = this._pruneLabelsResp(text);
        let json = JSON.parse(body);
        return json["lbls"];
    }


    static _pruneLabelsResp(body) {
        let startStr  = labelsRespPrefix.length;
        let finishStr = body.length - labelsRespSuffix.length;
        return body.substring(startStr, finishStr);
    }
}
