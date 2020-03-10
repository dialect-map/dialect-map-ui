/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Grid } from "semantic-ui-react";
import PapersSearch from "./PapersSearch";
import PapersSidebar from "./PapersSidebar";
import MapCanvas from "./tabs/Map";


class PapersPanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            chosenTab: "search",
            papers: [],
        };

        // Necessary binding in order to allow children actions
        this.getChosenTab = this.getChosenTab.bind(this);
        this.getPapers = this.getPapers.bind(this);
        this.setPapers = this.setPapers.bind(this);
        this.setJargonTab = this.setJargonTab.bind(this);
        this.setSearchTab = this.setSearchTab.bind(this);
    }


    getChosenTab() {
        return this.state.chosenTab;
    }


    getPapers() {
        return this.state.papers;
    }


    setPapers(papers) {
        this.setState({papers: papers});
    }


    setJargonTab() {
        this.setState({chosenTab: "jargon"});
    }


    setSearchTab() {
        this.setState({chosenTab: "search"});
    }


    renderTabHeader() {
        switch (this.state.chosenTab) {
            case "jargon":
                return <PapersSearch setPapers={this.setPapers}/>;
            case "search":
                return <PapersSearch setPapers={this.setPapers}/>;
            default:
                return <PapersSearch setPapers={this.setPapers}/>;
        }
    }


    render() {
        return (
            <Grid stretched>

                <Grid.Column width={1} className="panel-body-sidebar">
                    <PapersSidebar
                        getChosenTab={this.getChosenTab}
                        setJargonTab={this.setJargonTab}
                        setSearchTab={this.setSearchTab}
                    />
                </Grid.Column>

                <Grid.Column width={15} className="panel-body-main">
                    <Grid.Row className="panel-body-header">
                        { this.renderTabHeader() }
                    </Grid.Row>
                    <Grid.Row className="panel-body-map">
                        <MapCanvas
                            getPapers={this.getPapers}
                        />
                    </Grid.Row>
                </Grid.Column>

            </Grid>
        );
    }
}


export default withCookies(PapersPanel);
