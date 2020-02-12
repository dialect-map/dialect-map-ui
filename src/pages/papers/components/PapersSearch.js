/* encoding: utf-8 */

import React, { Component } from "react";
import PaperSearchCtl from "../controllers/PaperSearch";
import { Button, Dropdown, Icon, Image, Input, Menu, Segment } from "semantic-ui-react";


const searchOptions = [
    {key: 'author',     text: 'Author',     value: 'sau'},
    {key: 'keyword',    text: 'Keyword',    value: 'skw'},
    {key: 'title',      text: 'Title',      value: 'sti'},
    {key: 'new-papers', text: 'New papers', value: 'sca'},
];


export default class PapersSearch extends Component {


    constructor(props) {
        super(props);
        this.state = {
            unsavedPaperSearch: "",
            unsavedPaperSearchType: "",
        };
    }


    updateUnsavedSearch(event) {
        this.setState({
            unsavedPaperSearch: event.target.value
        });
    }


    updateUnsavedSearchType(change) {
        this.setState({
            unsavedPaperSearchType: change.value
        });
    }


    async searchPapers() {
        let papers = await PaperSearchCtl.fetchPapers(
            this.state.unsavedPaperSearchType,
            this.state.unsavedPaperSearch,
        );

        this.props.setPapers(papers);
    }


    render() {

        return (
            <Segment className="search-container">
                <Menu secondary>
                    <Menu.Item className="search-menu-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="filter"/>
                        </Image>
                        <b className="search-menu-text">
                            Search:
                        </b>
                        <Input
                            fluid
                            placeholder="Free energy..."
                            size="small"
                            onChange={event => this.updateUnsavedSearch(event)}
                        />
                    </Menu.Item>

                    <Menu.Item>
                        <Dropdown
                            selection
                            className="search-menu-dropdown"
                            placeholder='By'
                            options={searchOptions}
                            onChange={(event, change) => this.updateUnsavedSearchType(change)}
                        />
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item className="search-start-container">
                            <Button
                                color='blue'
                                onClick={this.searchPapers}
                            >
                                Search
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
