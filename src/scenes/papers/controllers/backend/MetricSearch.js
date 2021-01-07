/* encoding: utf-8 */

import config from "../../../../config"
import PaperJargonMetric from "../../models/PaperMetric";


export default class MetricSearchCtl {


    static fetchLatestMetrics(jargonID) {

        // prettier-ignore
        let url = config.dialectMapURL
            + "/paper/metrics/latest/"
            + encodeURIComponent(jargonID);

        return fetch(url, {})
            .then(resp => resp.json())
            .then(json => this._handleMetricSearchResp(json))
            .catch(err => console.log(err));
    }


    static _handleMetricSearchResp(json) {
        let metrics = [];

        try {
            metrics = json.map(metric => new PaperJargonMetric(metric));
        }
        catch(error) {
            console.log(error);
        }

        return metrics;
    }
}
