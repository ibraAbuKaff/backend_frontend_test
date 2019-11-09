import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/SignupLogin";
import * as serviceWorker from "./serviceWorker";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import allReducers from "./reducers";
import {Route, Router, Switch} from "react-router";
import createHistory from "history/createBrowserHistory";


const store = createStore(
    allReducers,
    applyMiddleware(thunk)
);

const historyOfApp = createHistory({
    //forceRefresh: true
    hashType: 'hashbang'
});


ReactDOM.render(
    <Provider store={store}>
        <Router history={historyOfApp}>
            <Switch>
                <Route exact path="/" component={App}/>
                {/*<Route exact path="/:title-:id" component={}/>*/}
                {/*<Route exact path="/bookmarks" component={}/>*/}
                {/*<Route exact path="/board/:id?" component={}/>*/}
            </Switch>
        </Router>

    </Provider>
    , document.getElementById('root'));

serviceWorker.register();






