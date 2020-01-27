/* encoding: utf-8 */

import React, { Component } from "react";
import { colorTilesHost, colorTilesAttr, greyTilesHost, greyTilesAttr } from "../../../../config";
import { LayersControl, Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default class MapCanvas extends Component {


    constructor(props) {
        super(props);
        this.state = {
            mapCenter: [37.765248, -122.402676],
            mapZoom: 10,
            markersRadius: 4,
        };
    }


    componentDidMount () {
        const map = this.map.leafletElement;
        setTimeout(() => map.invalidateSize(), 0);
    }


    render() {
        const { mapCenter, mapZoom } = this.state;

        return (
            // The "ref" prop is necessary to obtain the created instance
            <Map center={mapCenter} zoom={mapZoom} ref={(ref) => this.map = ref}>
                <LayersControl>
                    <LayersControl.BaseLayer
                        checked={false}
                        name="Color">
                        <TileLayer
                            url={colorTilesHost}
                            attribution={colorTilesAttr}
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer
                        checked={true}
                        name="Greyscale">
                        <TileLayer
                            url={greyTilesHost}
                            attribution={greyTilesAttr}
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
            </Map>
        );
    }
}
