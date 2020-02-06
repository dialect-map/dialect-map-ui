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
            chosenTab: "map",
            papers: [],
        };

        // Necessary binding in order to allow children actions
        this.setMapTab = this.setMapTab.bind(this);
    }


    renderTab() {
        switch (this.state.chosenTab) {
            case "map":
                return <MapCanvas papersList={this.state.papers}/>;
            default:
                return <MapCanvas papersList={this.state.papers}/>;
        }
    }


    setMapTab() {
        this.setState({chosenTab: "map"});
    }


    render() {
        return (
            <Grid className="panel-layout">

                <Grid.Row stretched className="panel-header">
                    <Grid.Column width={16}>
                        <PapersSearch/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row stretched className="panel-body">
                    <Grid.Column width={1} className="panel-body-sidebar">
                        <PapersSidebar
                            chosenTab={this.state.chosenTab}
                            setMapTab={this.setMapTab}
                        />
                    </Grid.Column>
                    <Grid.Column width={15} className="panel-body-main">
                        { this.renderTab() }
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        );
    }
}


export default withCookies(PapersPanel);
