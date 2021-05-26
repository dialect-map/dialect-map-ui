/* encoding: utf-8 */

import { Component } from "react";
import PaperSearchCtl from "../../../controllers/paperscape/PaperSearch";
import PaperSearchPositionCtl from "../../../controllers/paperscape/PaperSearchPosition";
import { Button, Dropdown, Icon, Image, Input, Menu, Segment } from "semantic-ui-react";
import "./Search.css";

// prettier-ignore
export const SearchOptions = [
    {key: "arxiv",      text: "Arxiv ID",   value: "saxm"},
    {key: "author",     text: "Author",     value: "sau"},
    {key: "keyword",    text: "Keyword",    value: "skw"},
    {key: "title",      text: "Title",      value: "sti"},
    {key: "new-papers", text: "New papers", value: "sca"},
];

export default class PaperSearch extends Component {
    /** Component to define the search query to the PaperScape API */

    constructor(props) {
        super(props);
        this.state = {
            paperSearch: "",
            paperSearchType: "",
        };

        // Necessary binding in order to access parent functions
        this.searchPapers = this.searchPapers.bind(this);
    }

    updateSearch(event) {
        this.setState({
            paperSearch: event.target.value,
        });
    }

    updateSearchType(change) {
        this.setState({
            paperSearchType: change.value,
        });
    }

    async searchPapers() {
        let ids = await PaperSearchCtl.fetchPapersIDs(
            this.state.paperSearchType,
            this.state.paperSearch
        );
        if (ids.length === 0) {
            return null;
        }

        let papers = await PaperSearchPositionCtl.fetchPapersPos(ids);
        this.props.setSearchPapers(papers);
    }

    render() {
        return (
            <Segment className="search-container">
                <Menu secondary>
                    <Menu.Item className="search-menu-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="filter" />
                        </Image>
                        <b className="search-menu-text">Search:</b>
                        <Input
                            fluid
                            placeholder="Free energy..."
                            onChange={event => this.updateSearch(event)}
                        />
                    </Menu.Item>

                    <Menu.Item className="search-menu-item">
                        <Dropdown
                            selection
                            className="search-menu-dropdown"
                            placeholder="By"
                            options={SearchOptions}
                            onChange={(event, change) => this.updateSearchType(change)}
                        />
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item className="search-start-container">
                            <Button color="blue" onClick={this.searchPapers}>
                                Search
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
