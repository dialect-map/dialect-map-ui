/* encoding: utf-8 */

import React, { Component } from "react";
import config from "../../../../config";
import { Circle } from "react-leaflet";


const paperIDRespPrefix = "(";
const paperIDRespSuffix = ")\n";


export default class MapSelectedPaper extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selected: {
                id: null,
                x:  null,
                y:  null,
                r:  null
            },
        };

        this.stringDecoder = new TextDecoder("utf-8");

        this.map = props.getMap();
        this.map.on("click", (e) => this.clickToPaperID(e));
    }


    _fetchPaperID(X_pos, Y_pos) {
        let url = config.locToPaperURL
            + "?callback="
            + "&tbl="
            + "&ml2p[]=" + X_pos
            + "&ml2p[]=" + Y_pos;


        fetch(url, {})
            .then(resp => this._handlePaperIDResp(resp))
            .then(____ => this.props.showInfoBox())
            .catch(err => console.log(err));
    }


    _handlePaperIDResp(resp) {
        let reader = resp.body.getReader();

        reader.read()
            .then(text => {
                let body = this.stringDecoder.decode(text.value);
                let resp = this._prunePaperIDResp(body);
                let json = JSON.parse(resp);

                if (json["r"] !== null) {
                    this.setState({
                        selected: json["r"]
                    });
                }
            })
            .catch(err => {
                console.log(err)
            });
    }


    _prunePaperIDResp(body) {
        let startStr = paperIDRespPrefix.length;
        let finishStr = body.length - paperIDRespSuffix.length;
        return body.substring(startStr, finishStr);
    }


    _isMapBackground(e) {
        let clickedClass = e.originalEvent.target.className;

        if (typeof(clickedClass) !== "string" || clickedClass.includes("leaflet") === false) {
            return false
        } else {
            return true;
        }
    }


    clickToPaperID(e) {
        // Stop click event if it was not performed directly into the map
        if (this._isMapBackground(e) === false) {
            return;
        }

        let coords = this.map.mouseEventToLatLng(e.originalEvent);
        let worldLoc = this.props.viewToWorld(coords.lng, coords.lat);
        this._fetchPaperID(worldLoc[0], worldLoc[1])
    }


    convertRadius(radius) {
        return radius * config.worldToViewScale;
    }


    render() {
        const { worldToView } = this.props;
        const { selected } = this.state;

        // In case the info box is hidden
        if ((selected.x === null) || (selected.y === null) || (selected.r === null)) {
            return false;
        }

        return (
            <Circle
                center={worldToView(selected.x, selected.y)}
                color={"black"}
                radius={this.convertRadius(selected.r)}>
            </Circle>
        );
    }
}
