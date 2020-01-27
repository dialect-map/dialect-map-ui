/* encoding: utf-8 */

import { GridLayer, withLeaflet } from "react-leaflet";
import { TileLayer, } from "leaflet";


class PaperscapeTiles extends GridLayer {


    getPaperscapeTileUrl(coords) {
        console.log("Retrieving tile from Paperscape backend");

        // PaperScape servers go from 1 to 4
        let server = Math.round(Math.random() * 3) + 1;
        let newZ = coords.z;
        let newX = coords.x + 40;
        let newY = coords.y + 40;

        return `http://tile${server}.${this.options.url}/${newZ}/${newX}/${newY}.png`;
    }


    // Function invoked by the GridLayer
    createLeafletElement(props) {
        let options = super.getOptions(props);
        options.tileSize = 512;
        options.minZoom = 1;
        options.maxZoom = 10;

        let layer = new TileLayer(props.url, options);
        layer.getTileUrl = this.getPaperscapeTileUrl;

        return layer
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
