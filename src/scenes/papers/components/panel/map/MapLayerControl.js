/* encoding: utf-8 */

import { Component } from "react";
import config from "../../../../../config";
import MapLabelsCtl from "../../../controllers/paperscape/MapLabels";
import MapTileLayer from "./MapTileLayer";
import { FeatureGroup, LayersControl, Marker } from "react-leaflet";
import { divIcon } from "leaflet";

export default class MapLayerControl extends Component {
    /** Component defining the box with the layer control options */

    constructor(props) {
        super(props);
        this.state = {
            labels: [],
        };

        // Necessary binding in order to access parent functions
        this.loadLabels = this.loadLabels.bind(this);
    }

    buildLabel(label) {
        let labelLevels = label.split(",");
        labelLevels = labelLevels.filter(s => s !== "");
        labelLevels = labelLevels.slice(0, 3);
        labelLevels = labelLevels.join("<br>");

        return labelLevels;
    }

    filterWorldLabels(label, northEast, southWest) {
        return (
            label.x >= southWest[0] &&
            label.x <= northEast[0] &&
            label.y >= northEast[1] &&
            label.y <= southWest[1]
        );
    }

    async loadLabels() {
        let map = this.props.getMap();

        let viewCenter = map.getCenter();
        let worldCenter = this.props.viewToWorld(viewCenter.lng, viewCenter.lat);
        let currentZoom = map.getZoom();
        let roundedZoom = Math.floor(currentZoom);

        let labels = await MapLabelsCtl.fetchLabels(roundedZoom, worldCenter);

        let viewBounds = map.getBounds();
        let worldNorthEast = this.props.viewToWorld(
            viewBounds._northEast.lng,
            viewBounds._northEast.lat
        );
        let worldSouthWest = this.props.viewToWorld(
            viewBounds._southWest.lng,
            viewBounds._southWest.lat
        );

        let worldLabels = labels.filter(label =>
            this.filterWorldLabels(label, worldNorthEast, worldSouthWest)
        );

        this.setState({
            labels: worldLabels,
        });
    }

    render() {
        const { worldToView } = this.props;
        const { labels } = this.state;

        return (
            <LayersControl position="topleft">
                <LayersControl.BaseLayer checked={false} name="Field">
                    <MapTileLayer
                        loadLabels={this.loadLabels}
                        tilesURL={config.tilesColorHost}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked={true} name="Heatmap">
                    <MapTileLayer
                        loadLabels={this.loadLabels}
                        tilesURL={config.tilesGreyHost}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.Overlay checked={true} key={0} name={"Labels"}>
                    <FeatureGroup>
                        {labels.map((label, index) => (
                            <Marker
                                key={index}
                                position={worldToView(label.x, label.y)}
                                icon={divIcon({
                                    className: "panel-body-map-label",
                                    html: this.buildLabel(label["lbl"]),
                                })}
                            />
                        ))}
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
        );
    }
}
