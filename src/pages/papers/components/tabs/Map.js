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

/*
 View offset with respect to the [0, 0]
 TODO: Why these values?
 */
const Y_axis_offset = - 897.5;
const X_axis_offset = + 998.5;


export default class MapCanvas extends Component {


    constructor(props) {
        super(props);
        this.map = null;  // Set up at render() time
    }


    componentDidMount () {
        setTimeout(() => this.map.invalidateSize(), 100);
    }


    buildLocationToPaperURL(X_pos, Y_pos) {
        return config.locationToPaperURL
            + "?callback=&tbl=" + "&"
            + "ml2p[]=" + X_pos + "&"
            + "ml2p[]=" + Y_pos
    }


    printInfo(e) {
        let coords = this.map.mouseEventToLatLng(e.originalEvent);

        let view_X_pos = coords.lng;
        let view_Y_pos = coords.lat;
        let world_loc = this.viewToWorld(view_X_pos, view_Y_pos);
        let url = this.buildLocationToPaperURL(world_loc[0], world_loc[1]);

        fetch(url, {})
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
    }


    worldToViewScale() {
        // Leaflet "Simple" CRS supposes a 1:1 ratio
        // Between tile pixels and world pixels at zoom 0.
        // As it is not the case, scaling need to be performed
        return tilePixelSize / tilePixelsAtZoom0;
    }


    viewToWorldScale() {
        return 1 / this.worldToViewScale();
    }


    worldToView(world_X, world_Y) {
        let scale = this.worldToViewScale();

        // Leaflet considers [Y, X] not [X, Y]
        return [
            (-1 * world_Y * scale) + Y_axis_offset,
            (+1 * world_X * scale) + X_axis_offset
        ];
    }


    viewToWorld(view_X, view_Y) {
        let scale = this.viewToWorldScale();

        // PaperScape considers [X, Y] not [Y, X]
        return [
            +1 * (view_X - X_axis_offset) * scale,
            -1 * (view_Y - Y_axis_offset) * scale
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
                onClick={(e) => this.printInfo(e)}
                zoom={config.mapInitialZoom}
                zoomDelta={config.mapZoomDelta}
                zoomSnap={config.mapZoomSnap}
                ref={(ref) => this.map = ref.leafletElement}
            >
                <LayersControl>
                    <LayersControl.BaseLayer
                        checked={false}
                        name="Field">
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
                        center={this.worldToView(paper.x, paper.y)}
                        color={"red"}
                        radius={4}>
                    </CircleMarker>
                )}
            </Map>
        );
    }
}
