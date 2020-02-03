/* encoding: utf-8 */

import React, { Component } from "react";
import * as config from "../../../../config";
import PapersTilesLayer from "../../controllers/PapersTilesLayer";
import { CircleMarker, LayersControl, Map } from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";


/*
 The complete specification can be obtained from:
 https://tile1.paperscape.org/world/world_index.json
 */
const tilePixelSize = 512;
const tilePixelsAtZoom0 = 37732;


export default class MapCanvas extends Component {


    constructor(props) {
        super(props);
        this.map = null;  // Set up at render() time
    }


    componentDidMount () {
        setTimeout(() => this.map.invalidateSize(), 100);
    }


    worldToViewScale() {
        // Leaflet "Simple" CRS supposes a 1:1 ratio between tile pixels and world pixels at zoom 0.
        // As it is not the case, scaling need to be performed
        return tilePixelSize / tilePixelsAtZoom0;
    }


    worldToView(worldPaper) {
        let scale = this.worldToViewScale();

        // TODO: Why this offsets?
        let Y_axis_offset = - 897.5;
        let X_axis_offset = + 998.5;

        // Leaflet considers [Y, X] not [X, Y]
        return [
            (-1 * worldPaper.y * scale) + Y_axis_offset,
            (+1 * worldPaper.x * scale) + X_axis_offset
        ];
    }


    render() {
        const { papersList } = this.props;

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
                        name="Discipline">
                        <PapersTilesLayer
                            url={config.colorTilesHost}
                            attribution={config.colorTilesAttr}
                            tileSize={tilePixelSize}
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer
                        checked={true}
                        name="Heatmap">
                        <PapersTilesLayer
                            url={config.greyTilesHost}
                            attribution={config.greyTilesAttr}
                            tileSize={tilePixelSize}
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                {papersList.map((paper, index) =>
                    <CircleMarker
                        key={index}
                        center={this.worldToView(paper)}
                        color={"red"}
                        radius={4}>
                    </CircleMarker>
                )}
            </Map>
        );
    }
}
