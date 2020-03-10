/* encoding: utf-8 */

import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";


export default class PapersSidebar extends Component {


    isMapActive() {
        return this.props.getChosenTab() === "search";
    }


    render() {

        // Change-state functions passed by the parent
        const { setMapTab } = this.props;

        return (
            <Menu compact icon vertical>
                <Menu.Item
                    name="map"
                    active={this.isMapActive()}
                    onClick={setMapTab}
                >
                    <Icon circular inverted color="blue" name="search"/>
                </Menu.Item>
            </Menu>
        );
    }
}
