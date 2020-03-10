/* encoding: utf-8 */


export default class PaperPosition {

    constructor(apiResponse) {
        this.id = apiResponse.id;
        this.x  = apiResponse.x;
        this.y  = apiResponse.y;
        this.r  = apiResponse.r;
    }
}
