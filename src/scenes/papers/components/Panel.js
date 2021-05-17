/* encoding: utf-8 */

import { Component } from "react";
import { Grid } from "semantic-ui-react";
import PapersSidebar from "./Sidebar";
import JargonSearch from "./panel/search/JargonSearch";
import PaperSearch from "./panel/search/PaperSearch";
import MapCanvas from "./panel/map/Map";
import "./Panel.css";

export const PanelTabs = {
    JARGON_SEARCH: "jargon",
    PAPER_SEARCH: "paper",
};

export default class PapersPanel extends Component {
    /** Component defining the main section div (sidebar + searchbar + map) */

    constructor(props) {
        super(props);
        this.state = {
            chosenTab: PanelTabs.PAPER_SEARCH,
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
        this.setState({ chosenTab: PanelTabs.JARGON_SEARCH });
    }

    setSearchTab() {
        this.setState({ chosenTab: PanelTabs.PAPER_SEARCH });
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
            case PanelTabs.JARGON_SEARCH:
                return <JargonSearch setJargonPapers={this.setJargonTabPapers} />;
            case PanelTabs.PAPER_SEARCH:
                return <PaperSearch setSearchPapers={this.setSearchTabPapers} />;
            default:
                return <PaperSearch setSearchPapers={this.setSearchTabPapers} />;
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
