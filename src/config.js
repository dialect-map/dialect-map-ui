/* encoding: utf-8 */

const config = {

    /* Leaflet map properties */
    mapBounds: [[-2000, 0], [0, 2000]],
    mapBoundsViscosity: 0.8,
    mapInitialCenter: [-1000, 1000],
    mapInitialZoom: 0,
    mapZoomDelta: 0.25,
    mapZoomSnap: 0.25,


    /* PaperScape map properties
    *
    *  They change in a daily basis.
    *  They need to be fetched prior any rendering
    */
    worldMinX: null,
    worldMaxX: null,
    worldMinY: null,
    worldMaxY: null,
    worldTileSize: null,

    viewToWorldScale: null,
    worldToViewScale: null,


    /* PaperScape URLs */
    worldConfigURL: "https://tile1.paperscape.org/world/world_index.json",
    locToPaperURL:  "https://paperscape.org/wombat",
    labelsJsonHost: "https://tile1.paperscape.org/world/zones",


    /* Mandatory proxy to allow PaperScape CORS requests */
    worldMandatoryProxy: "https://cors-anywhere.herokuapp.com",


    /* Color tiles provider */
    colorTilesHost: "https://tile{s}.paperscape.org/world/tiles/{z}/{x}/{y}.png",
    colorTilesAttr: "<a href=https://github.com/paperscape>PaperScape</a>",

    /* Greyscale tiles provider */
    greyTilesHost: "https://tile{s}.paperscape.org/world/tiles-hm/{z}/{x}/{y}.png",
    greyTilesAttr: "<a href=https://github.com/paperscape>PaperScape</a>",
};


export default config;
