/* encoding: utf-8 */

import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";


export default class PapersSidebar extends Component {


    isSearchActive() {
        return this.props.getChosenTab() === "search";
    }

    isJargonActive() {
        return this.props.getChosenTab() === "jargon";
    }


    render() {

        // Change-state functions passed by the parent
        const { setJargonTab, setSearchTab } = this.props;

        return (
            <Menu compact icon vertical>
                <Menu.Item
                    name="search"
                    active={this.isSearchActive()}
                    onClick={setSearchTab}
                >
                    <Icon circular inverted color="blue" name="search"/>
                </Menu.Item>
                <Menu.Item
                    name="jargon"
                    active={this.isJargonActive()}
                    onClick={setJargonTab}
                >
                    <Icon circular inverted color="blue" name="comment"/>
                </Menu.Item>
            </Menu>
        );
    }
}
