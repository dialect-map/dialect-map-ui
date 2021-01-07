/* encoding: utf-8 */

import { GridLayer, withLeaflet } from "react-leaflet";
import { TileLayer } from "leaflet";

class MapTilesLayer extends GridLayer {
    /** Class overriding the default Leaflet GridLayer functionality */

    getCustomOptions(props) {
        let options = super.getOptions(props);
        options.minZoom = 0;
        options.maxZoom = 6;
        options.continuousWorld = true;
        options.subdomains = ["1", "2", "3", "4"];

        return options;
    }

    customGetTileUrl(coords) {
        coords.x += 1;
        coords.y += 1;
        return this.defaultGetTileUrl(coords);
    }

    // Function invoked by the GridLayer
    createLeafletElement(props) {
        let options = this.getCustomOptions(props);
        let layer = new TileLayer(props.url, options);

        // Override default in order to correct zoom drift
        layer.defaultGetTileUrl = layer.getTileUrl;
        layer.getTileUrl = this.customGetTileUrl;

        return layer;
    }

    // Function invoked by the GridLayer
    updateLeafletElement(fromProps, toProps) {
        super.updateLeafletElement(fromProps, toProps);
        if (toProps.url !== fromProps.url) {
            this.leafletElement.setUrl(toProps.url);
        }
    }
}

export default withLeaflet(MapTilesLayer);
