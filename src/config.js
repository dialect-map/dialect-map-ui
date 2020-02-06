/* encoding: utf-8 */


/* Leaflet map properties */
export const mapBounds = [[-2000, 0], [0, 2000]];
export const mapBoundsViscosity = 0.8;
export const mapInitialCenter = [-1000, 1000];
export const mapInitialZoom = 0;
export const mapZoomDelta = 0.25;
export const mapZoomSnap = 0.25;


/* PaperScape map properties
*
*  They change in a daily basis.
*  They need to be fetched prior any rendering
*/
export const worldMinX = null;
export const worldMaxX = null;
export const worldMinY = null;
export const worldMaxY = null;
export const tileRealPixelsSize = null;
export const tileWorldPixelsAtZoom0 = null;


/* PaperScape URLs */
export const worldConfigParams  = "https://tile1.paperscape.org/world/world_index.json";
export const locationToPaperURL = "https://paperscape.org/wombat";
export const labelsJsonHost     = "https://tile1.paperscape.org/world/zones";


/* Mandatory proxy to allow PaperScape CORS requests */
export const worldMandatoryProxy = "https://cors-anywhere.herokuapp.com";


/* Color tiles provider */
export const colorTilesHost = 'https://tile{s}.paperscape.org/world/tiles/{z}/{x}/{y}.png';
export const colorTilesAttr = '<a href=https://github.com/paperscape>PaperScape</a>';

/* Greyscale tiles provider */
export const greyTilesHost = 'https://tile{s}.paperscape.org/world/tiles-hm/{z}/{x}/{y}.png';
export const greyTilesAttr = '<a href=https://github.com/paperscape>PaperScape</a>';
