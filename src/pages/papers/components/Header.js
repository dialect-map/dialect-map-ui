/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Menu, Segment } from "semantic-ui-react";
import HeaderModal from "./header/HeaderModal";


class Header extends Component {


    render() {
        return (
            <Segment>
                <Menu secondary>
                    <Menu.Item name="Dialect Map"/>
                    <Menu.Menu position="right">
                        <HeaderModal/>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}


export default withCookies(Header);
