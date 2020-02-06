/* encoding: utf-8 */


/* IMPORTANT NOTE:
 *
 * Using a CORS-proxy given that the paperscape responses
 * Do not include the 'Access-Control-Allow-Origin' header
 * Ref: https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
 */
const worldMandatoryProxy = "https://cors-anywhere.herokuapp.com/";


const config = {

    /* Leaflet map properties */
    mapBoundsCoords: [[-2000, 0], [0, 2000]],
    mapBoundsViscosity: 0.8,
    mapInitialCenter: [-1000, 1000],
    mapInitialZoom: 0,
    mapZoomDelta: 0.25,
    mapZoomSnap: 0.25,


    /* PaperScape map properties
     *
     * They change in a daily basis.
     * They need to be fetched prior any rendering
     */
    worldMinX: null,
    worldMaxX: null,
    worldMinY: null,
    worldMaxY: null,
    worldTileSize: null,

    viewToWorldScale: null,
    worldToViewScale: null,


    /* PaperScape URLs */
    worldConfigURL: worldMandatoryProxy + "https://tile1.paperscape.org/world/world_index.json",
    locToPaperURL:  worldMandatoryProxy + "https://paperscape.org/wombat",
    labelsJsonHost: worldMandatoryProxy + "https://tile1.paperscape.org/world/zones",


    /* PaperScape tiles URLs */
    tilesColorHost: "https://tile{s}.paperscape.org/world/tiles/{z}/{x}/{y}.png",
    tilesGreyHost:  "https://tile{s}.paperscape.org/world/tiles-hm/{z}/{x}/{y}.png",
    tilesAttrib:    "<a href=https://github.com/paperscape>PaperScape</a>",
};


export default config;
