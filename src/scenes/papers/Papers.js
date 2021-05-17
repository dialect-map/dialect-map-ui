/* encoding: utf-8 */

import { Component } from "react";
import { Grid } from "semantic-ui-react";
import PapersHeader from "./components/Header";
import PapersPanel from "./components/Panel";
import "./Papers.css";

export default class PapersMap extends Component {
    /** Component containing the whole papers map scene */

    render() {
        return (
            <Grid className="papers-layout">
                <Grid.Row stretched className="papers-header">
                    <Grid.Column width={16}>
                        <PapersHeader />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row stretched className="papers-body">
                    <Grid.Column width={16}>
                        <PapersPanel />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
