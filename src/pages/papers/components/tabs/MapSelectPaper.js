/* encoding: utf-8 */

import React, { Component } from "react";
import config from "../../../../config";
import PaperInfoCtl from "../../controllers/PaperInfo";
import PaperPositionCtl from "../../controllers/PaperPosition";
import MapInfoBox from "./MapInfoBox";
import { Circle } from "react-leaflet";


export default class MapSelectPaper extends Component {


    constructor(props) {
        super(props);
        this.state = {
            paperInfoVisible: false,
            paperPos: null,
            paperInfo: {
                title: "Loading...",
                authors: "Loading...",
                publisher: "Loading...",
                arxivID: "",
                numRefs: 0,
                numCits: 0,
            },
        };

        this.map = props.getMap();
        this.map.on("click", (e) => this.clickToPaperPos(e));

        // Necessary binding in order to pass these functions to children
        this.getPaperInfo = this.getPaperInfo.bind(this);
        this.hidePaperInfo = this.hidePaperInfo.bind(this);
    }


    getPaperInfo() {
        return this.state.paperInfo;
    }


    hidePaperInfo() {
        this.setState({paperInfoVisible: false});
    }


    showPaperInfo() {
        this.setState({paperInfoVisible: true});
    }


    _isMapBackground(e) {
        let clickedClass = e.originalEvent.target.className;

        if (typeof(clickedClass) !== "string" || clickedClass.includes("leaflet") === false) {
            return false
        } else {
            return true;
        }
    }


    async clickToPaperPos(e) {
        // Stop click event if it was not performed directly into the map
        if (this._isMapBackground(e) === false) {
            return;
        }

        let coords = this.map.mouseEventToLatLng(e.originalEvent);
        let worldLoc = this.props.viewToWorld(coords.lng, coords.lat);

        let paperPos = await PaperPositionCtl.fetchPaperPos(worldLoc[0], worldLoc[1]);
        let paperInfo = await PaperInfoCtl.fetchPaperInfo(paperPos.id);
        this.setState({
            paperPos: paperPos,
            paperInfo: paperInfo,
        });

        this.showPaperInfo();
    }


    convertRadius(radius) {
        return radius * config.worldToViewScale;
    }


    render() {
        const { worldToView } = this.props;
        const { paperPos } = this.state;

        return (
            <div>
                {this.state.paperInfoVisible ?
                    (
                        <MapInfoBox
                            getPaperInfo={this.getPaperInfo}
                            hidePaperInfo={this.hidePaperInfo}
                        />
                    ) : null
                }
                {this.state.paperPos !== null ?
                    (
                        <Circle
                            center={worldToView(paperPos.x, paperPos.y)}
                            color={"black"}
                            radius={this.convertRadius(paperPos.r)}
                        />
                    ) : null
                }
            </div>
        );
    }
}
