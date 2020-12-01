/* encoding: utf-8 */

import React, { Component } from "react";
import config from "../../../../config";
import PaperInfoCtl from "../../controllers/paperscape/PaperInfo";
import PaperPositionCtl from "../../controllers/paperscape/PaperPosition";
import MapInfoBox from "./MapInfoBox";
import { Circle } from "react-leaflet";


export default class MapSelectPaper extends Component {


    constructor(props) {
        super(props);
        this.state = {
            paperInfoVisible: false,
            paperInfo: null,
            paperPos: null,
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


    _isMapInfoBox(event) {
        let clickedClass = event.originalEvent.target.className;

        return (typeof clickedClass === "string")
            && (clickedClass.includes("leaflet") === false);
    }


    async clickToPaperPos(event) {
        // Stop click event if it was performed on the information box
        if (this._isMapInfoBox(event)) {
            return;
        }

        let coords = this.map.mouseEventToLatLng(event.originalEvent);
        let worldLoc = this.props.viewToWorld(coords.lng, coords.lat);

        let paperPos = await PaperPositionCtl.fetchPaperPos(worldLoc[0], worldLoc[1]);
        if (paperPos === null) {
            return;
        }

        let paperInfo = await PaperInfoCtl.fetchPaperInfo(paperPos.id);
        if (paperInfo === null) {
            return;
        }

        this.updateSelectedPaper(paperPos, paperInfo);
    }


    convertRadius(radius) {
        return radius * config.worldToViewScale;
    }


    updateSelectedPaper(paperPos, paperInfo) {
        this.setState({
            paperInfoVisible: true,
            paperInfo: paperInfo,
            paperPos: paperPos,
        });
    }


    render() {
        const { worldToView } = this.props;
        const { paperPos } = this.state;

        return (
            <div>
                { this.state.paperInfoVisible ?
                    (
                        <MapInfoBox
                            getPaperInfo={this.getPaperInfo}
                            hidePaperInfo={this.hidePaperInfo}
                        />
                    ) : null
                }
                { this.state.paperPos !== null ?
                    (
                        <Circle
                            center={worldToView(paperPos.x, paperPos.y)}
                            color={"yellow"}
                            radius={this.convertRadius(paperPos.r)}
                        />
                    ) : null
                }
            </div>
        );
    }
}
