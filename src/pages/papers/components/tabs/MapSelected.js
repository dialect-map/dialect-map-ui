/* encoding: utf-8 */

import React, { Component } from "react";
import * as config from "../../../../config";
import { Circle } from "react-leaflet";


const paperIDRespPrefix = '(';
const paperIDRespSuffix = ')\n';


export default class MapSelectedPaper extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selected: {
                id: 0,
                x: 0,
                y: 0,
                r: 0
            },
        };

        this.stringDecoder = new TextDecoder("utf-8");

        this.map = props.getMap();
        this.map.on("click", (e) => this.clickToPaperID(e));
    }


    _fetchPaperID(X_pos, Y_pos) {
        let url = config.locationToPaperURL
            + "?callback="
            + "&tbl="
            + "&ml2p[]=" + X_pos
            + "&ml2p[]=" + Y_pos;

        // Using a CORS-proxy given that the paperscape responses
        // Do not include the 'Access-Control-Allow-Origin' header
        // Ref: https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
        fetch(config.worldMandatoryProxy + "/" + url, {})
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
        let world_loc = this.props.viewToWorld(view_X_pos, view_Y_pos);

        this._fetchPaperID(world_loc[0], world_loc[1]);
    }


    convertRadius(radius) {
        return radius * this.props.worldToViewScale();
    }


    render() {
        const { worldToView } = this.props;
        const { selected } = this.state;

        return (
            <Circle
                center={worldToView(selected.x, selected.y)}
                color={"black"}
                radius={this.convertRadius(selected.r)}>
            </Circle>
        );
    }
}
