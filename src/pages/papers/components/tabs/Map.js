/* encoding: utf-8 */

import React, { Component } from "react";
import * as config from "../../../../config";
import PapersTilesLayer from "../../controllers/PapersTilesLayer";
import { LayersControl, Map } from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";


const world_X_min = -73523;
const world_X_max = 69456;

const world_Y_min = -66067;
const world_Y_max = 84802;


export default class MapCanvas extends Component {


    constructor(props) {
        super(props);

        // Set up at render() time
        this.map = null;
    }


    componentDidMount () {
        setTimeout(() => this.map.invalidateSize(), 100);
    }


    getPan() {
        let centerLatLng = this.map.getCenter();
        let centerCoords = this.map.latLngToLayerPoint(centerLatLng);
        let originCoords = this.map.getPixelOrigin();

        return [
            centerCoords.x - originCoords.x,
            centerCoords.y - originCoords.y
        ];
    }


    worldToViewScale() {
        let canvasBounds = this.map.getPixelBounds();
        let canvasWidth = canvasBounds.max.x - canvasBounds.min.x;
        let currentZoom = this.map.getZoom();
        let worldWidth = world_X_max - world_X_min;

        return (canvasWidth * currentZoom) / worldWidth;
    }


    viewToWorldScale() {
        return 1 / this.worldToViewScale()
    }


    render() {

        return (
            // The "ref" prop is necessary to obtain the created instance
            <Map
                center={config.mapInitialCenter}
                crs={CRS.Simple}
                maxBounds={config.mapBounds}
                maxBoundsViscosity={config.mapBoundsViscosity}
                zoom={config.mapInitialZoom}
                zoomDelta={config.mapZoomDelta}
                zoomSnap={config.mapZoomSnap}
                ref={(ref) => this.map = ref.leafletElement}
            >
                <LayersControl>
                    <LayersControl.BaseLayer
                        checked={false}
                        name="Color">
                        <PapersTilesLayer
                            url={config.colorTilesHost}
                            attribution={config.colorTilesAttr}
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer
                        checked={true}
                        name="Greyscale">
                        <PapersTilesLayer
                            url={config.greyTilesHost}
                            attribution={config.greyTilesAttr}
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
            </Map>
        );
    }
}
