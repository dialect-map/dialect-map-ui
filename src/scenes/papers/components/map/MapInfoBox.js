/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Card, Icon, List } from "semantic-ui-react";


export default class MapInfoBox extends Component {
    /** Component defining the information box upon paper selection */


    buildArxivLink(arxivID) {
        return "https://arxiv.org/pdf/" + arxivID;
    }


    render() {
        const { getPaperInfo, hidePaperInfo } = this.props;
        const paperInfo = getPaperInfo();
        const arxivLink = this.buildArxivLink(paperInfo.arxivID);

        return (
            <Card className="panel-body-map-info">
                <Button icon onClick={hidePaperInfo}>
                    <Icon name="minus square" />
                </Button>

                <Card.Content>
                    <Card.Header>
                        { paperInfo.getTitleForView() }
                    </Card.Header>
                    <Card.Description>
                        { paperInfo.getAuthorsForView() }
                    </Card.Description>
                    <Card.Description>
                        { paperInfo.getPublisherForView() }
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
                            { paperInfo.numRefs } references
                        </List.Item>
                        <List.Item>
                            <Icon name="file alternate" />
                            { paperInfo.numCits } citations
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        );
    }
}
