/* encoding: utf-8 */

import config from "../../../config"
import PaperInfo from "../models/PaperInfo"


const paperInfoRespPrefix = "(";
const paperInfoRespSuffix = ")\n";


export default class PaperInfoCtl  {


    static fetchPaperInfo(paperID) {
        let url = config.paperInfoURL
            + "?callback="
            + "&flags[]=1"
            + "&gdata[]=" + paperID;

        return fetch(url, {})
            .then(resp => resp.text())
            .then(text => this._handlePaperInfoResp(text))
    }


    static _handlePaperInfoResp(text) {
        let paperInfo = null;

        try {
            let body = this._prunePaperInfoResp(text);
            let json = JSON.parse(body);
            let data = json["r"]["papr"][0];
            paperInfo = new PaperInfo(data);
        }
        catch(error) {
            console.log(error);
        }

        return paperInfo;
    }


    static _prunePaperInfoResp(body) {
        let startStr = paperInfoRespPrefix.length;
        let finishStr = body.length - paperInfoRespSuffix.length;

        return body.substring(startStr, finishStr);
    }
}
