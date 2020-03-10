/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Icon, Image, Input, Menu, Segment } from "semantic-ui-react";


export default class Jargon extends Component {


    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        return (
            <Segment className="search-container">
                <Menu secondary>
                    <Menu.Item className="search-menu-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="comment"/>
                        </Image>
                        <b className="search-menu-text">
                            Jargon:
                        </b>
                        <Input
                            fluid
                            placeholder="Free energy..."
                        />
                    </Menu.Item>
                    <Menu.Item className="search-menu-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="comment"/>
                        </Image>
                        <b className="search-menu-text">
                            Jargon:
                        </b>
                        <Input
                            fluid
                            placeholder="ELBO..."
                        />
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item className="search-start-container">
                            <Button
                                color='blue'>
                                Compare
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
