/* encoding: utf-8 */

import React, { Component } from "react";
import * as config from "../../../../config";
import MapLayerControl from "./MapLayerControl";
import MapSelectedPaper  from "./MapSelected";
import { CircleMarker, Map } from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";


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


    worldToViewScale() {
        // Leaflet "Simple" CRS supposes a 1:1 ratio
        // Between tile pixels and world pixels at zoom 0.
        // As it is not the case, scaling need to be performed
        return config.tileRealPixelsSize / config.tileWorldPixelsAtZoom0;
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
                zoom={config.mapInitialZoom}
                zoomDelta={config.mapZoomDelta}
                zoomSnap={config.mapZoomSnap}
                ref={(ref) => this.setMap(ref)}
            >
                <MapLayerControl
                    getMap={this.getMap}
                    viewToWorld={this.viewToWorld}
                    worldToView={this.worldToView}
                />

                <MapSelectedPaper
                    getMap={this.getMap}
                    viewToWorld={this.viewToWorld}
                    worldToView={this.worldToView}
                    worldToViewScale={this.worldToViewScale}
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
