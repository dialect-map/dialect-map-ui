/* encoding: utf-8 */

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import StreamPage from './pages/papers/Papers';
import "semantic-ui-css/semantic.min.css";
import './index.css';


ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <Route exact path="/"    component={StreamPage} />
            <Route exact path="/map" component={StreamPage} />
        </BrowserRouter>
    </CookiesProvider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
