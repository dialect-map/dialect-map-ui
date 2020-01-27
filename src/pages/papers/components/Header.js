/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";


class Header extends Component {


    constructor(props) {
        super(props);
        this.showInfo = this.showInfo.bind(this);
    }


    showInfo() {
        alert("Dialect map is a project by the NYU Center of Data Science " +
            "that compares jargon areas of influence by using " +
            "the visual representation of ArXiv stored papers " +
            "provided by the PaperScape project"
        )
    }


    render() {
        return (
            <Segment>
                <Menu secondary>
                    <Menu.Item name="Dialect Map"/>
                    <Menu.Menu position="right">
                        <Menu.Item
                            name="Info"
                            onClick={this.showInfo}
                        />
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}


export default withCookies(withRouter(Header));
