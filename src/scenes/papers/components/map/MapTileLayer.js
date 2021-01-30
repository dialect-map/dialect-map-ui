/* encoding: utf-8 */

import config from "../../../../config";
import { TileLayer } from "leaflet";
import { createLayerComponent, updateGridLayer } from "@react-leaflet/core";

class MapTileLayer {
    /** Class overriding the default Leaflet TileLayer functionality */

    static getCustomOptions() {
        return {
            attribution: config.tilesAttrib,
            minZoom: config.mapZoomMinimum,
            maxZoom: config.mapZoomMaximum,
            subdomains: config.mapSubdomains,
            tileSize: config.worldTileSize,
        };
    }

    static customGetTileUrl(coords) {
        coords.x += 1;
        coords.y += 1;
        return this.defaultGetTileUrl(coords);
    }

    static createTileLayer(props, context) {
        let options = MapTileLayer.getCustomOptions();
        let layer = new TileLayer(props.tilesURL, options);

        // Override default in order to correct zoom drift
        layer.defaultGetTileUrl = layer.getTileUrl;
        layer.getTileUrl = MapTileLayer.customGetTileUrl;
        layer.on("load", props.loadLabels);

        return {
            instance: layer,
            context: context,
        };
    }

    static updateTileLayer(instance, props, prevProps) {
        updateGridLayer(instance, props, prevProps);

        if (props.url !== prevProps.url) {
            instance.setUrl(props.url);
        }
    }
}

export default createLayerComponent(
    MapTileLayer.createTileLayer,
    MapTileLayer.updateTileLayer
);
