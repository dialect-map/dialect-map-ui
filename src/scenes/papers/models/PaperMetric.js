/* encoding: utf-8 */

export default class PaperJargonMetric {
    /** Model containing the basic jargon metric structure */

    // prettier-ignore
    constructor(data) {
        this.id       = data["metric_id"];
        this.jargonID = data["jargon_id"];
        this.arxivID  = data["arxiv_id"];
        this.arxivRev = data["arxiv_rev"];
        this.absFreq  = data["abs_freq"];
        this.relFreq  = data["rel_freq"];
    }
}
