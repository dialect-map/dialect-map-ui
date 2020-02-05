/* encoding: utf-8 */

import React, { Component } from "react";
import * as config from "../../../../config";
import MapLayerControl from "./MapLayerControl";
import { CircleMarker, Map } from "react-leaflet";
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

        // Set up at render() time
        this.map = null;

        // Necessary binding in order to pass these functions to children
        this.getMap = this.getMap.bind(this);
        this.viewToWorld = this.viewToWorld.bind(this);
        this.worldToView = this.worldToView.bind(this);
    }


    componentDidMount () {
        setTimeout(() => this.map.invalidateSize(), 200);
    }


    getMap() {
        return this.map;
    }


    setMap(ref) {
        if (this.map === null) {
            this.map = ref.leafletElement;
        }
    }


    _fetchPaperID(X_pos, Y_pos) {
        let url = config.locationToPaperURL
            + "?callback="
            + "&tbl="
            + "&ml2p[]=" + X_pos
            + "&ml2p[]=" + Y_pos;

        fetch(url, {})
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
    }


    clickToPaperID(e) {
        let coords = this.map.mouseEventToLatLng(e.originalEvent);

        let view_X_pos = coords.lng;
        let view_Y_pos = coords.lat;
        let world_loc = this.viewToWorld(view_X_pos, view_Y_pos);

        this._fetchPaperID(world_loc[0], world_loc[1]);
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
            (-1 * (world_Y - config.worldMinY) * scale),
            (+1 * (world_X - config.worldMinX) * scale),
        ];
    }


    viewToWorld(view_X, view_Y) {
        let scale = this.viewToWorldScale();

        // PaperScape considers [X, Y] not [Y, X]
        return [
            (+1 * view_X * scale) + config.worldMinX,
            (-1 * view_Y * scale) + config.worldMinY,
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
                onClick={(e) => this.clickToPaperID(e)}
                zoom={config.mapInitialZoom}
                zoomDelta={config.mapZoomDelta}
                zoomSnap={config.mapZoomSnap}
                ref={(ref) => this.setMap(ref)}
            >
                <MapLayerControl
                    getMapFunc={this.getMap}
                    viewToWorldFunc={this.viewToWorld}
                    worldToViewFunc={this.worldToView}
                    tileSize={tilePixelSize}
                />

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
