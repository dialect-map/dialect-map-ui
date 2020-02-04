/* encoding: utf-8 */

import React, { Component } from "react";
import * as config from "../../../../config";
import PapersTilesLayer from "../../controllers/PapersTilesLayer";
import { FeatureGroup, LayersControl } from "react-leaflet";


export default class MapLayerControl extends Component {


    constructor(props) {
        super(props);
        this.state = {
            labels: []
        };

        this.loadLabels = this.loadLabels.bind(this);
    }


    loadLabels() {
        console.log("Loaded!");
    }


    render() {
        const { tileSize } = this.props;
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
                        {labels.map((label, index) => <div/>)}
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
        );
    }
}
