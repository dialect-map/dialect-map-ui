/* encoding: utf-8 */

import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import PapersMap from "./scenes/papers/Papers";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={PapersMap} />
        <Route exact path="/map" component={PapersMap} />
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
