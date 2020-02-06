/* encoding: utf-8 */

import React, { Component } from "react";
import * as config from "../../../../config";
import { CircleMarker } from "react-leaflet";


const paperIDRespPrefix = '(';
const paperIDRespSuffix = ')\n';


export default class MapSelectedPaper extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selected: {id: 0, x: 0, y: 0, r: 0},
        };

        this.stringDecoder = new TextDecoder("utf-8");

        this.map = props.getMapFunc();
        this.map.on("click", (e) => this.clickToPaperID(e));
    }


    _fetchPaperID(X_pos, Y_pos) {
        let url = config.locationToPaperURL
            + "?callback="
            + "&tbl="
            + "&ml2p[]=" + X_pos
            + "&ml2p[]=" + Y_pos;

        fetch(config.labelsJsonProxy + "/" + url, {})
            .then(resp => this._handlePaperIDResp(resp))
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
        let startStr  = paperIDRespPrefix.length;
        let finishStr = body.length - paperIDRespSuffix.length;
        return body.substring(startStr, finishStr);
    }


    clickToPaperID(e) {
        let coords = this.map.mouseEventToLatLng(e.originalEvent);

        let view_X_pos = coords.lng;
        let view_Y_pos = coords.lat;
        let world_loc = this.props.viewToWorldFunc(view_X_pos, view_Y_pos);

        this._fetchPaperID(world_loc[0], world_loc[1]);
    }


    convertRadius(radius) {
        return radius / 75;
    }


    render() {
        const { worldToViewFunc } = this.props;
        const { selected } = this.state;

        return (
            <CircleMarker
                key={4}
                center={worldToViewFunc(selected.x, selected.y)}
                color={"black"}
                radius={this.convertRadius(selected.r)}>
            </CircleMarker>
        );
    }
}
