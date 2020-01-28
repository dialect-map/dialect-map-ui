/* encoding: utf-8 */

import { GridLayer, withLeaflet } from "react-leaflet";
import { TileLayer } from "leaflet";


class PaperscapeTiles extends GridLayer {


    // Function invoked by the GridLayer
    createLeafletElement(props) {
        let options = super.getOptions(props);
        options.minZoom = 0;
        options.maxZoom = 6;
        options.tileSize = 512;
        options.noWrap = true;
        options.continuousWorld = true;
        options.subdomains = ["1", "2", "3", "4"];

        return new TileLayer(props.url, options);
    }


    // Function invoked by the GridLayer
    updateLeafletElement(fromProps, toProps) {
        super.updateLeafletElement(fromProps, toProps);
        if (toProps.url !== fromProps.url) {
            this.leafletElement.setUrl(toProps.url)
        }
    }
}


export default withLeaflet(PaperscapeTiles)
