/* encoding: utf-8 */

import config from "../../../config"


const paperPosRespPrefix = "(";
const paperPosRespSuffix = ")\n";


export default class PaperPositionCtl  {


    static fetchPaperPos(X_pos, Y_pos) {
        let url = config.paperPosURL
            + "?callback="
            + "&tbl="
            + "&ml2p[]=" + X_pos
            + "&ml2p[]=" + Y_pos;

        return fetch(url, {})
            .then(resp => resp.text())
            .then(text => this._handlePaperPosResp(text))
            .catch(err => console.log(err));
    }


    static _handlePaperPosResp(text) {
        let body = this._prunePaperPosResp(text);
        let json = JSON.parse(body);
        return json["r"];
    }


    static _prunePaperPosResp(body) {
        let startStr = paperPosRespPrefix.length;
        let finishStr = body.length - paperPosRespSuffix.length;
        return body.substring(startStr, finishStr);
    }
}
