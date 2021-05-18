/* encoding: utf-8 */

import config from "../../../../config";
import PaperPosition from "../../models/PaperPosition";

const paperPositionRespPrefix = "(";
const paperPositionRespSuffix = ")\n";

export default class PaperPositionCtl {
    /** Controller defining the paper coordinates queries to the Paperscape API */

    static fetchPaperPos(X_pos, Y_pos) {
        // prettier-ignore
        let url = config.papersDataURL
            + "?callback="
            + "&tbl="
            + "&ml2p[]=" + X_pos
            + "&ml2p[]=" + Y_pos;

        return fetch(url, {})
            .then(resp => resp.text())
            .then(text => this._handlePaperPosResp(text));
    }

    static _handlePaperPosResp(text) {
        let paperPos = null;

        try {
            let body = this._prunePaperPosResp(text);
            let json = JSON.parse(body);
            let data = json["r"];
            paperPos = new PaperPosition(data);
        } catch (error) {
            console.log(error);
        }

        return paperPos;
    }

    static _prunePaperPosResp(body) {
        return body.slice(
            +1 * paperPositionRespPrefix.length,
            -1 * paperPositionRespSuffix.length
        );
    }
}
