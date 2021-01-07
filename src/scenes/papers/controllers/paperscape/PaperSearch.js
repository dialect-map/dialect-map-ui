/* encoding: utf-8 */

import config from "../../../../config"


const paperSearchRespPrefix = "(";
const paperSearchRespSuffix = ")\n";


export default class PaperSearchCtl {


    static fetchPapersIDs(searchKey, searchValue) {
        let url = config.papersDataURL
            + this._buildRequestParams(searchKey, searchValue);

        return fetch(url, {})
            .then(resp => resp.text())
            .then(text => this._handlePaperSearchResp(text));
    }


    static _buildRequestParams(searchKey, searchValue) {
        let params = "?callback=";

        switch (searchKey) {
            case "saxm":
                params += "&saxm=" + searchValue;
                break;
            case "sau":
                params += "&sau=" + searchValue;
                break;
            case "skw":
                params += "&skw=" + searchValue;
                break;
            case "sti":
                params += "&sti=" + searchValue;
                break;
            case "sca":
                params += "&sca=" + searchValue + "&fd=1&td=0";
                break;
            default:
                params += "&skw=" + searchValue;
                break;
        }

        return params;
    }


    static _handlePaperSearchResp(text) {
        let paperIDs = [];

        try {
            let body = this._prunePaperSearchResp(text);
            let json = JSON.parse(body);
            let data = json["r"];
            paperIDs = data.map(paper => paper.id);
        }
        catch(error) {
            console.log(error);
        }

        return paperIDs;
    }


    static _prunePaperSearchResp(body) {
        let startStr = paperSearchRespPrefix.length;
        let finishStr = body.length - paperSearchRespSuffix.length;

        return body.substring(startStr, finishStr);
    }
}
