/* encoding: utf-8 */

import { Component } from "react";
import { Header, Menu, Segment } from "semantic-ui-react";
import HeaderModal from "./HeaderModal";
import "./Header.css";

export default class PapersHeader extends Component {
    /** Component defining the global scene header */

    render() {
        return (
            <Segment className="papers-header-segment">
                <Menu secondary>
                    <Menu.Item>
                        <Header as="h4">Dialect Map</Header>
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <HeaderModal />
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
