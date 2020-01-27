/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Icon, Image, Input, Menu, Segment } from "semantic-ui-react";


export default class PapersSearch extends Component {


    constructor(props) {
        super(props);
        this.state = {
            unsavedPapersJargonA: "",
            unsavedPapersJargonB: "",
        };
    }


    updateUnsavedJargonA(event) {
        this.setState({
            unsavedPapersJargonA: event.target.value
        });
    }


    updateUnsavedJargonB(event) {
        this.setState({
            unsavedPapersJargonB: event.target.value
        });
    }


    render() {

        return (
            <Segment className="search-container">
                <Menu secondary>
                    <Menu.Item className="search-menu-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="filter"/>
                        </Image>
                        <b className="search-menu-text">
                            Jargon term A:
                        </b>
                        <Input
                            fluid
                            placeholder="Free energy..."
                            size="small"
                            onChange={event => this.updateUnsavedJargonA(event)}
                        />
                    </Menu.Item>

                    <Menu.Item className="search-menu-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="filter"/>
                        </Image>
                        <b className="search-menu-text">
                            Jargon term B:
                        </b>
                        <Input
                            fluid
                            placeholder="ELBO..."
                            size="small"
                            onChange={event => this.updateUnsavedJargonB(event)}
                        />
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item className="search-start-container">
                            <Button
                                color='blue'
                                onClick={() => {return false;} }>
                                Search
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
