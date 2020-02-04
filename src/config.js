/* encoding: utf-8 */


/* PaperScape map properties */
export const mapBounds = [[-2000, 0], [0, 2000]];
export const mapBoundsViscosity = 0.8;
export const mapInitialCenter = [-1000, 1000];
export const mapInitialZoom = 0;
export const mapZoomDelta = 0.25;
export const mapZoomSnap = 0.25;


/* PaperScape URLs */
export const locationToPaperURL = "https://paperscape.org/wombat";


/* Color tiles provider */
export const colorTilesHost = 'https://tile{s}.paperscape.org/world/tiles/{z}/{x}/{y}.png';
export const colorTilesAttr = '<a href=https://github.com/paperscape>PaperScape</a>';

/* Greyscale tiles provider */
export const greyTilesHost = 'https://tile{s}.paperscape.org/world/tiles-hm/{z}/{x}/{y}.png';
export const greyTilesAttr = '<a href=https://github.com/paperscape>PaperScape</a>';
