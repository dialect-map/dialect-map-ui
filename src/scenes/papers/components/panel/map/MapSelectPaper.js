/* encoding: utf-8 */

import { Component } from "react";
import ClickHandler from "./events/MapClickEvent";
import MapInfoBox from "./MapInfoBox";
import { Circle } from "react-leaflet";

export default class MapSelectPaper extends Component {
    /** Component defining the paper selection elements */

    constructor(props) {
        super(props);
        this.state = {
            paperInfoVisible: false,
            paperInfo: null,
            paperPos: null,
        };

        // Necessary binding in order to pass these functions to children
        this.getPaperInfo = this.getPaperInfo.bind(this);
        this.hidePaperInfo = this.hidePaperInfo.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
    }

    getPaperInfo() {
        return this.state.paperInfo;
    }

    hidePaperInfo() {
        this.setState({ paperInfoVisible: false });
    }

    updateSelected(paperPos, paperInfo) {
        this.setState({
            paperInfoVisible: true,
            paperInfo: paperInfo,
            paperPos: paperPos,
        });
    }

    render() {
        const { convertRadius, viewToWorld, worldToView } = this.props;
        const { paperPos } = this.state;

        return (
            <div>
                <ClickHandler
                    viewToWorld={viewToWorld}
                    updateSelected={this.updateSelected}
                />
                {this.state.paperInfoVisible ? (
                    <MapInfoBox
                        getPaperInfo={this.getPaperInfo}
                        hidePaperInfo={this.hidePaperInfo}
                    />
                ) : null}
                {this.state.paperPos !== null ? (
                    <Circle
                        center={worldToView(paperPos.x, paperPos.y)}
                        color={"yellow"}
                        radius={convertRadius(paperPos.r)}
                    />
                ) : null}
            </div>
        );
    }
}
