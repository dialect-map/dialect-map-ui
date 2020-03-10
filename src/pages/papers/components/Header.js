/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Header, Menu, Segment } from "semantic-ui-react";
import HeaderModal from "./header/HeaderModal";


class PapersHeader extends Component {


    render() {
        return (
            <Segment className="papers-header-segment">
                <Menu secondary>
                    <Menu.Item>
                        <Header as="h4">Map of Jargon Across Domains</Header>
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <HeaderModal/>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}


export default withCookies(PapersHeader);
