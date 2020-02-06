/* encoding: utf-8 */

import React, { Component } from "react";
import config from "../../../../config";
import { LABELS } from "./MapLabels";
import PapersTilesLayer from "../../controllers/PapersTilesLayer";
import { FeatureGroup, LayersControl, Marker } from "react-leaflet";
import { divIcon } from "leaflet";


const labelsRespPrefix = "lz_Z_X_Y(";
const labelsRespSuffix = ")";


export default class MapLayerControl extends Component {


    constructor(props) {
        super(props);
        this.state = {
            labels: []
        };

        this.stringDecoder = new TextDecoder("utf-8");

        // Necessary binding in order to access parent functions
        this.loadLabels = this.loadLabels.bind(this);
    }


    _getLabelTile(coord, coordMin, coordMax, tilesNum) {
        let chunkSize = (coordMax - coordMin) / tilesNum;
        let upperBound = coordMin;
        let tileIndex = 1;

        while (true) {
            upperBound += chunkSize;
            if (coord < upperBound) {
                break
            } else {
                tileIndex += 1;
            }
        }

        return tileIndex;
    }


    _fetchLabels(Z_level, X_tile, Y_tile) {
        let url = config.labelsJsonHost
            + "/" + Z_level
            + "/" + X_tile
            + "/" + Y_tile
            + ".json";

        fetch(url, {})
            .then(resp => this._handleLabelsResp(resp))
            .catch(err => console.log(err));
    }


    _handleLabelsResp(resp) {
        let reader = resp.body.getReader();

        reader.read()
            .then(text => {
                let body = this.stringDecoder.decode(text.value);
                let resp = this._pruneLabelsResp(body);
                let json = JSON.parse(resp);

                this.setState({
                    labels: json["lbls"]
                });
            })
            .catch(err => {
                console.log(err)
            });
    }


    _pruneLabelsResp(body) {
        let startStr  = labelsRespPrefix.length;
        let finishStr = body.length - labelsRespSuffix.length;
        return body.substring(startStr, finishStr);
    }


    loadLabels() {
        let map = this.props.getMap();

        let viewCenter  = map.getCenter();
        let worldCenter = this.props.viewToWorld(viewCenter.lng, viewCenter.lat);

        let currentZoom = map.getZoom();
        let roundedZoom = Math.floor(currentZoom);
        let labelSpec   = LABELS[roundedZoom];
        let labelsXTile = this._getLabelTile(worldCenter[0], config.worldMinX, config.worldMaxX, labelSpec.nx);
        let labelsYTile = this._getLabelTile(worldCenter[1], config.worldMinY, config.worldMaxY, labelSpec.ny);

        this._fetchLabels(roundedZoom, labelsXTile, labelsYTile);
    }


    render() {
        const { worldToView } = this.props;
        const { labels } = this.state;

        return (
            <LayersControl>
                <LayersControl.BaseLayer
                    checked={false}
                    name="Field">
                    <PapersTilesLayer
                        url={config.tilesColorHost}
                        attribution={config.tilesAttrib}
                        tileSize={config.worldTileSize}
                        onLoad={this.loadLabels}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer
                    checked={true}
                    name="Heatmap">
                    <PapersTilesLayer
                        url={config.tilesGreyHost}
                        attribution={config.tilesAttrib}
                        tileSize={config.worldTileSize}
                        onLoad={this.loadLabels}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.Overlay
                    checked={true}
                    key={0}
                    name={"Labels"}>
                    <FeatureGroup>
                        {labels.map((label, index) =>
                            <Marker
                                key={index}
                                position={worldToView(label.x, label.y)}
                                icon={divIcon({
                                    className: "panel-body-map-label",
                                    html: label["lbl"].split(",").join("<br>")
                                })}
                            >
                            </Marker>
                        )}
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
        );
    }
}
