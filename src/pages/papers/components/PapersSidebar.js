/* encoding: utf-8 */

import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";


export default class PapersSidebar extends Component {


    render() {

        // Change-state functions passed by the parent
        const { chosenTab, setMapTab } = this.props;

        return (
            <Menu compact icon vertical>
                <Menu.Item
                    name="map"
                    active={chosenTab === "map"}
                    onClick={setMapTab}>
                    <Icon circular inverted color="blue" name="map"/>
                </Menu.Item>
            </Menu>
        );
    }
}
