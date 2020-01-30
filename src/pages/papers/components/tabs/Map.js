/* encoding: utf-8 */

import React, { Component } from "react";
import CustomCRS from "../../controllers/PapersCRS";
import PapersTilesLayer from "../../controllers/PapersTilesLayer";
import * as config from "../../../../config";
import { LayersControl, Map } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default class MapCanvas extends Component {


    constructor(props) {
        super(props);

        // Set up at render() time
        this.map = null;
    }


    componentDidMount () {
        setTimeout(() => this.map.invalidateSize(), 100);
    }


    render() {

        return (
            // The "ref" prop is necessary to obtain the created instance
            <Map
                center={config.mapInitialCenter}
                crs={CustomCRS}
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
