/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Icon, Image, Input, Menu, Segment } from "semantic-ui-react";
import JargonSearchCtl from "../../controllers/backend/JargonSearch";
import MetricSearchCtl from "../../controllers/backend/MetricSearch";


export default class Jargon extends Component {


    constructor(props) {
        super(props);
        this.state = {
            searchedJargonA: "",
            searchedJargonB: "",
        };

        // Necessary binding in order to access parent functions
        this.searchPapers = this.searchPapers.bind(this);
    }


    updateJargonA(event) {
        this.setState({
            searchedJargonA: event.target.value
        });
    }


    updateJargonB(event) {
        this.setState({
            searchedJargonB: event.target.value
        });
    }


    reduceJargonAbsFrequency(acc, metric) {
        let id = metric.arxivID
        acc[id] = (acc[id] || {})
        acc[id][metric.jargonID] = metric.absFreq;
        return acc
    }


    async searchPapers() {
        let jargons  = [this.state.searchedJargonA, this.state.searchedJargonB]
        let promises = jargons.map(j => this.searchMetrics(j))

        let metrics = (await Promise.all(promises)).flat()
        let jargonFreq = metrics.reduce(this.reduceJargonAbsFrequency, {})
        console.log(jargonFreq)

        //console.log(jargonFreq)
        // Get paper coordinates from paperscape
        // Draw
    }


    async searchMetrics(jargon) {
        let jargonID = await JargonSearchCtl.fetchJargonID(jargon);
        if (jargonID === null) {
            return [];
        }

        return await MetricSearchCtl.fetchLatestMetrics(jargonID);
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
                            onChange={event => this.updateJargonA(event)}
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
                            onChange={event => this.updateJargonB(event)}
                        />
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item className="search-start-container">
                            <Button
                                color='blue'
                                onClick={this.searchPapers}
                            >
                                Compare
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
