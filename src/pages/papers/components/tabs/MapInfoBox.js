/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Card, Icon, List } from "semantic-ui-react";


export default class MapInfoBox extends Component {


    constructor(props) {
        super(props);
        this.state = {
            paper: {
                title: "Loading...",
                authors: "Loading...",
                publisher: "Loading...",
                arxivID: "",
                numRefs: 0,
                numCits: 0,
            },
        };
    }


    buildArxivLink() {
        return "https://arxiv.org/pdf/" + this.state.paper.arxivID;
    }


    render() {
        const { getInfoBox, hideInfoBox } = this.props;
        const arxivLink = this.buildArxivLink();

        // In case the info box is hidden
        if (getInfoBox() === false) {
            return false;
        }

        return (
            <Card className="panel-body-map-info">
                <Button icon onClick={hideInfoBox}>
                    <Icon name="minus square" />
                </Button>

                <Card.Content>
                    <Card.Header>
                        {this.state.paper.title}
                    </Card.Header>
                    <Card.Description>
                        {this.state.paper.authors}
                    </Card.Description>
                    <Card.Description>
                        {this.state.paper.publisher}
                        <a
                            href={arxivLink}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
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
