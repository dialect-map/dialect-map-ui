/* encoding: utf-8 */

import config from "../../../config"


const paperInfoRespPrefix = "(";
const paperInfoRespSuffix = ")\n";


export default class PaperInfoCtl  {


    static async fetchPaperInfo(paperID) {
        let url = config.paperInfoURL
            + "?callback="
            + "&flags[]=1"
            + "&gdata[]=" + paperID;

        fetch(url, {})
            .then(resp => resp.text())
            .then(text => this._handlePaperInfoResp(text))
            .catch(err => console.log(err));
    }


    static _handlePaperInfoResp(text) {
        let body = this._prunePaperInfoResp(text);
        let json = JSON.parse(body);
        return json["r"]["papr"][0];
    }


    static _prunePaperInfoResp(body) {
        let startStr = paperInfoRespPrefix.length;
        let finishStr = body.length - paperInfoRespSuffix.length;
        return body.substring(startStr, finishStr);
    }
}
