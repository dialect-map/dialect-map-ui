/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Card, Icon, List } from "semantic-ui-react";


export default class MapInfoBox extends Component {


    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            paper: {
                title: "Loading...",
                authors: "Loading...",
                publisher: "Loading...",
                arxivID: "",
                numRefs: 0,
                numCits: 0,
            },
        };

        // Necessary binding in order to modify the state
        this.hideInfoBox = this.hideInfoBox.bind(this);
    }


    buildArxivLink() {
        return "https://arxiv.org/pdf/" + this.state.paper.arxivID;
    }


    hideInfoBox() {
        this.setState({
            visible: false,
        })
    }


    render() {
        const { visible } = this.state;
        const a = this.buildArxivLink();

        if (!visible) {
            return false;
        }

        return (
            <Card className="panel-body-map-info">
                <Button icon onClick={this.hideInfoBox}>
                    <Icon name="minus square" />
                </Button>

                <Card.Content>
                    <Card.Header>{this.state.paper.title}</Card.Header>
                    <Card.Description>
                        {this.state.paper.authors}
                    </Card.Description>
                    <Card.Description>
                        {this.state.paper.publisher}
                        <a href={a} rel="noopener noreferrer" target="_blank">
                            <Icon name="file pdf" />
                        </a>
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <List horizontal>
                        <List.Item>
                            <Icon name="linkify" />
                            {this.state.paper.numRefs} references
                        </List.Item>
                        <List.Item>
                            <Icon name="file alternate" />
                            {this.state.paper.numCits} citations
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        );
    }
}
