/* encoding: utf-8 */

const maxCharsPerField = 40;

export default class PaperInfo {
    /** Model containing the paper information structure */

    // prettier-ignore
    constructor(data) {
        // Some of these fields may not be in the API response
        this.title   = data["titl"] || "";
        this.auth    = data["auth"] || "";
        this.publ    = data["publ"] || "";
        this.arxivID = data["arxv"] || "";
        this.numRefs = data["nr"];
        this.numCits = data["nc"];
    }

    getTitleForView() {
        let shortTitle = this.title.substring(0, maxCharsPerField);
        if (shortTitle.length < this.title.length) {
            shortTitle += "...";
        }
        return shortTitle;
    }

    getAuthorsForView() {
        let shortAuthors = this.auth.substring(0, maxCharsPerField);
        if (shortAuthors.length < this.auth.length) {
            shortAuthors += "...";
        }
        return shortAuthors;
    }

    getPublisherForView() {
        let shortPublisher = this.publ.substring(0, maxCharsPerField);
        if (shortPublisher.length < this.publ.length) {
            shortPublisher += "...";
        }
        return shortPublisher;
    }
}
