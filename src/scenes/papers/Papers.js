/* encoding: utf-8 */

import { Component } from "react";
import { Grid } from "semantic-ui-react";
import MapConfigCtl from "./controllers/paperscape/MapConfig";
import PapersHeader from "./components/Header";
import PapersPanel from "./components/Panel";
import "./Papers.css";

export default class PapersMap extends Component {
    /** Component containing the whole papers map scene */

    constructor(props) {
        super(props);
        this.state = {
            configLoaded: false,
        };

        // Necessary binding to use this function in the React lifecycle
        this.setConfigLoaded = this.setConfigLoaded.bind(this);
    }

    componentDidMount() {
        MapConfigCtl.fetchConfig().then(this.setConfigLoaded);
    }

    setConfigLoaded() {
        this.setState({ configLoaded: true });
    }

    render() {
        if (this.state.configLoaded === false) {
            return null;
        }

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
