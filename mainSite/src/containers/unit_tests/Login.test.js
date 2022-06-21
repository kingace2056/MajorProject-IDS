import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "../../store/reducers/auth";
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";

import Login from "../Login"

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router><Provider store={store}><Login /></Provider></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
    const tree = renderer
        .create(<Router><Provider store={store}><Login /></Provider></Router>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});