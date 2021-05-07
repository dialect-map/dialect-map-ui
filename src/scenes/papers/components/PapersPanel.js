/* encoding: utf-8 */

import { Component } from "react";
import { Grid } from "semantic-ui-react";
import PapersSidebar from "./PapersSidebar";
import MapCanvas from "./map/Map";
import Jargon from "./headers/Jargon";
import Search from "./headers/Search";

export default class PapersPanel extends Component {
    /** Component defining the main section div (sidebar + header + map) */

    constructor(props) {
        super(props);
        this.state = {
            chosenTab: "search",
            jargonTabProperties: {
                extras: {},
                papers: [],
            },
            searchTabProperties: {
                papers: [],
            },
        };

        // Tab choosing related functions
        this.getChosenTab = this.getChosenTab.bind(this);
        this.setJargonTab = this.setJargonTab.bind(this);
        this.setSearchTab = this.setSearchTab.bind(this);

        // Papers related getters and setters
        this.getJargonTabExtras = this.getJargonTabExtras.bind(this);
        this.getJargonTabPapers = this.getJargonTabPapers.bind(this);
        this.setJargonTabPapers = this.setJargonTabPapers.bind(this);
        this.getSearchTabPapers = this.getSearchTabPapers.bind(this);
        this.setSearchTabPapers = this.setSearchTabPapers.bind(this);
    }

    getChosenTab() {
        return this.state.chosenTab;
    }

    setJargonTab() {
        this.setState({ chosenTab: "jargon" });
    }

    setSearchTab() {
        this.setState({ chosenTab: "search" });
    }

    getJargonTabExtras() {
        return this.state.jargonTabProperties.extras;
    }

    getJargonTabPapers() {
        return this.state.jargonTabProperties.papers;
    }

    setJargonTabPapers(papers, extras) {
        this.setState(prevState => ({
            ...prevState,
            jargonTabProperties: { papers: papers, extras: extras },
        }));
    }

    getSearchTabPapers() {
        return this.state.searchTabProperties.papers;
    }

    setSearchTabPapers(papers) {
        this.setState(prevState => ({
            ...prevState,
            searchTabProperties: { papers: papers },
        }));
    }

    renderTabHeader() {
        switch (this.state.chosenTab) {
            case "jargon":
                return <Jargon setJargonPapers={this.setJargonTabPapers} />;
            case "search":
                return <Search setSearchPapers={this.setSearchTabPapers} />;
            default:
                return <Search setSearchPapers={this.setSearchTabPapers} />;
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
                        {this.renderTabHeader()}
                    </Grid.Row>
                    <Grid.Row className="panel-body-map">
                        <MapCanvas
                            getJargonExtras={this.getJargonTabExtras}
                            getJargonPapers={this.getJargonTabPapers}
                            getSearchPapers={this.getSearchTabPapers}
                        />
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        );
    }
}
