import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./containers/Auth/Login";
import Signup from "./containers/Auth/Signup";
import Supplier from "./containers/Suppliers/Suppliers";
import Contractor from "./containers/Contractors/Contractors";
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
                <Route exact path="/" component={Signup}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/supplier" component={Supplier}/>
                <Route exact path="/contractor" component={Contractor}/>
                {/*<Route exact path="/:title-:id" component={}/>*/}
                {/*<Route exact path="/bookmarks" component={}/>*/}
                {/*<Route exact path="/board/:id?" component={}/>*/}
            </Switch>
        </Router>

    </Provider>
    , document.getElementById('root'));

serviceWorker.register();






