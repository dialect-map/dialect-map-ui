/* encoding: utf-8 */

import config from "../../../../config"


export default class JargonSearchCtl {


    static fetchJargonID(searchJargon) {
        let url = config.dialectMapURL
            + "/jargon/string/"
            + encodeURIComponent(searchJargon);

        return fetch(url, {})
            .then(resp => resp.json())
            .then(json => this._handleJargonSearchResp(json))
            .catch(err => console.log(err));
    }


    static _handleJargonSearchResp(json) {
        let jargonID = null;

        try {
            jargonID = json["jargon_id"];
        }
        catch(error) {
            console.log(error);
        }

        return jargonID;
    }
}
