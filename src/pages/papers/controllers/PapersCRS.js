/* encoding: utf-8 */

import { CRS } from "leaflet";


const CustomCRS = CRS.Simple;

// Overriding CRS.Simple scale function
CustomCRS.scale = function(zoom) {
    // The 0.55 offset is a magic number
    return Math.pow(2, zoom) + 0.55;
};


export default CustomCRS;
