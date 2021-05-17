/* encoding: utf-8 */

import { Component } from "react";
import { Button, Icon, Image, Input, Menu, Segment } from "semantic-ui-react";
import JargonSearchCtl from "../../controllers/backend/JargonSearch";
import MetricSearchCtl from "../../controllers/backend/MetricSearch";
import PaperSearchCtl from "../../controllers/paperscape/PaperSearch";
import PaperSearchPositionCtl from "../../controllers/paperscape/PaperSearchPosition";
import "./Header.css";

// prettier-ignore
export const JargonColors = [
    {key: "blue", text: "blue", rgb: {r: 0,   g: 0, b: 255}},
    {key: "red",  text: "red",  rgb: {r: 255, g: 0, b: 0}},
];

export default class Jargon extends Component {
    /** Component to define the jargon terms comparison across papers */

    constructor(props) {
        super(props);
        this.state = {
            searchedJargonA: "",
            searchedJargonB: "",
        };

        // Necessary binding in order to access parent functions
        this.searchPapersAndExtras = this.searchPapersAndExtras.bind(this);
    }

    updateJargonA(event) {
        this.setState({
            searchedJargonA: event.target.value,
        });
    }

    updateJargonB(event) {
        this.setState({
            searchedJargonB: event.target.value,
        });
    }

    async queryJargonIds(jargons) {
        let promises = jargons.map(j => JargonSearchCtl.fetchJargonID(j));
        let results = await Promise.all(promises);
        return results.filter(id => id !== null);
    }

    async queryMetrics(jargonIds) {
        let promises = jargonIds.map(id => MetricSearchCtl.fetchLatestMetrics(id));
        let results = await Promise.all(promises);
        return results.flat();
    }

    async queryPaperIds(arxivIds) {
        let promises = arxivIds.map(id => PaperSearchCtl.fetchPapersIDs("saxm", id));
        let results = await Promise.all(promises);
        return results.flat();
    }

    async searchFrequenciesByPaper() {
        let jargons = [this.state.searchedJargonA, this.state.searchedJargonB];
        let jargonIds = await this.queryJargonIds(jargons);
        let metrics = await this.queryMetrics(jargonIds);

        let emptyFreqs = {};
        jargonIds.forEach(id => (emptyFreqs[id] = 0));

        let papersFreqs = {};
        metrics.forEach(m => (papersFreqs[m.arxivID] = { ...emptyFreqs }));
        metrics.forEach(m => (papersFreqs[m.arxivID][m.jargonID] = m.absFreq));

        return papersFreqs;
    }

    async searchPapers(arxivIds) {
        let paperIds = await this.queryPaperIds(arxivIds);
        if (paperIds.length === 0) {
            return [];
        }

        return await PaperSearchPositionCtl.fetchPapersPos(paperIds);
    }

    async searchPapersAndExtras() {
        let freqs = await this.searchFrequenciesByPaper();
        let axvIds = Object.keys(freqs);
        let papers = await this.searchPapers(axvIds);
        this.props.setJargonPapers(papers, { freqByPaper: freqs });
    }

    render() {
        return (
            <Segment className="search-container">
                <Menu secondary>
                    <Menu.Item className="search-menu-item">
                        <Image avatar>
                            <Icon
                                circular
                                inverted
                                color={JargonColors[0].text}
                                name="comment"
                            />
                        </Image>
                        <b className="search-menu-text">Jargon A:</b>
                        <Input
                            fluid
                            placeholder="Free energy..."
                            onChange={event => this.updateJargonA(event)}
                        />
                    </Menu.Item>
                    <Menu.Item className="search-menu-item">
                        <Image avatar>
                            <Icon
                                circular
                                inverted
                                color={JargonColors[1].text}
                                name="comment"
                            />
                        </Image>
                        <b className="search-menu-text">Jargon B:</b>
                        <Input
                            fluid
                            placeholder="ELBO..."
                            onChange={event => this.updateJargonB(event)}
                        />
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item className="search-start-container">
                            <Button color="blue" onClick={this.searchPapersAndExtras}>
                                Compare
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
