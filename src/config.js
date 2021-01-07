/* encoding: utf-8 */

/* IMPORTANT NOTE:
 *
 * Previously, a CORS-proxy was necessary to parse PaperScape responses
 * As they may not include the 'Access-Control-Allow-Origin' header.
 * Consider these resources if this change in the future:
 *
 * Ref: https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
 * Redirect: https://cors-anywhere.herokuapp.com/
 */

const config = {
    /* Leaflet map properties */
    mapBoundsCoords: [
        [-2000, 0],
        [0, 2000],
    ],
    mapBoundsViscosity: 0.8,
    mapInitialCenter: [-1000, 1000],
    mapInitialZoom: 0,
    mapZoomControl: false,
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

    worldLabels: {
        0: { nx: 1, ny: 1 },
        1: { nx: 1, ny: 1 },
        2: { nx: 1, ny: 1 },
        3: { nx: 1, ny: 1 },
        4: { nx: 2, ny: 2 },
        5: { nx: 4, ny: 4 },
        6: { nx: 8, ny: 8 },
    },

    /* Dialect map server */
    dialectMapHost: window.env.SERVER_API_HOST,
    dialectMapPort: window.env.SERVER_API_PORT,
    dialectMapURL: `${window.env.SERVER_API_HOST}:${window.env.SERVER_API_PORT}`,

    /* PaperScape URLs */
    papersDataURL: "https://paperscape.org/wombat",
    worldConfigURL: "https://tile1.paperscape.org/world/world_index.json",
    labelsJsonHost: "https://tile1.paperscape.org/world/zones",

    /* PaperScape tiles URLs */
    tilesColorHost: "https://tile{s}.paperscape.org/world/tiles/{z}/{x}/{y}.png",
    tilesGreyHost: "https://tile{s}.paperscape.org/world/tiles-hm/{z}/{x}/{y}.png",
    tilesAttrib: "<a href=https://github.com/paperscape>PaperScape</a>",
};

export default config;
