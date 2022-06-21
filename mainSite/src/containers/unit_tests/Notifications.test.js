import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "../../store/reducers/auth";

import Notifications from "../Notifications";

var attackStats = {
    'Wrong Setup': 0,
    'DDOS': 0,
    'Data Type Probing': 0,
    'Scan Attack': 0,
    'MITM': 0
}

var notifList = {}

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store={store}><Notifications notifList={notifList} attackStats={attackStats} /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});