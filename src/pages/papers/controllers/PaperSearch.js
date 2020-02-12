/* encoding: utf-8 */

import config from "../../../config"


const paperSearchRespPrefix = "(";
const paperSearchRespSuffix = ")\n";


export default class PaperSearchCtl  {


    static fetchPapers(searchKey, searchValue) {
        let url = config.papersDataURL
            + "?callback="
            + "&" + searchKey + "=" + searchValue;

        return fetch(url, {})
            .then(resp => resp.text())
            .then(text => this._handlePaperSearchResp(text))
    }


    static _handlePaperSearchResp(text) {
        let papers = [];

        try {
            let body = this._prunePaperSearchResp(text);
            let json = JSON.parse(body);
            papers = json["r"];
        }
        catch(error) {
            console.log(error);
        }

        return papers;
    }


    static _prunePaperSearchResp(body) {
        let startStr = paperSearchRespPrefix.length;
        let finishStr = body.length - paperSearchRespSuffix.length;

        return body.substring(startStr, finishStr);
    }
}
