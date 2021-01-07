/* encoding: utf-8 */

export default class PaperPosition {
    /** Model containing the basic paper position structure */

    // prettier-ignore
    constructor(data) {
        this.id = data["id"];
        this.x  = data["x"];
        this.y  = data["y"];
        this.r  = data["r"];
    }
}
