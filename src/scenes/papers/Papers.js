/* encoding: utf-8 */

import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import PapersHeader from "./components/Header";
import PapersPanel from "./components/PapersPanel";
import "./Papers.css";


export default class PapersMap extends Component {


    render() {
        return (
            <Grid className="papers-layout">

                <Grid.Row stretched className="papers-header">
                    <Grid.Column width={16}>
                        <PapersHeader/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row stretched className="papers-body">
                    <Grid.Column width={16}>
                        <PapersPanel/>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        );
    }
}
