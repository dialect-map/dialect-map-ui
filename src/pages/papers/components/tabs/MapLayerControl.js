/* encoding: utf-8 */

import React, { Component } from "react";
import { LABELS } from "./MapLabels";
import * as config from "../../../../config";
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

        // Using a CORS-proxy given that the paperscape responses
        // Do not include the 'Access-Control-Allow-Origin' header
        // Ref: https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
        fetch(config.labelsJsonProxy + "/" + url, {})
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
        let map = this.props.getMapFunc();

        let viewCenter  = map.getCenter();
        let worldCenter = this.props.viewToWorldFunc(viewCenter.lng, viewCenter.lat);

        let currentZoom = map.getZoom();
        let roundedZoom = Math.round(currentZoom);
        let labelSpec   = LABELS[roundedZoom];
        let labelsXTile = this._getLabelTile(worldCenter[0], config.worldMinX, config.worldMaxX, labelSpec.nx);
        let labelsYTile = this._getLabelTile(worldCenter[1], config.worldMinY, config.worldMaxY, labelSpec.ny);

        this._fetchLabels(roundedZoom, labelsXTile, labelsYTile);
    }


    render() {
        const { tileSize, worldToViewFunc } = this.props;
        const { labels } = this.state;

        return (
            <LayersControl>
                <LayersControl.BaseLayer
                    checked={false}
                    name="Field">
                    <PapersTilesLayer
                        url={config.colorTilesHost}
                        attribution={config.colorTilesAttr}
                        tileSize={tileSize}
                        onLoad={this.loadLabels}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer
                    checked={true}
                    name="Heatmap">
                    <PapersTilesLayer
                        url={config.greyTilesHost}
                        attribution={config.greyTilesAttr}
                        tileSize={tileSize}
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
                                position={worldToViewFunc(label["x"], label["y"])}
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
