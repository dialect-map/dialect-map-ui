/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Dropdown, Icon, Image, Input, Menu, Segment } from "semantic-ui-react";


const searchOptions = [
    {key: 'author',     text: 'Author',     value: 'author'},
    {key: 'keyword',    text: 'Keyword',    value: 'keyword'},
    {key: 'title',      text: 'Title',      value: 'title'},
    {key: 'new-papers', text: 'New papers', value: 'new-papers'},
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


    searchPapers() {
        return [];
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
                                onClick={this.searchPapers}>
                                Search
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
