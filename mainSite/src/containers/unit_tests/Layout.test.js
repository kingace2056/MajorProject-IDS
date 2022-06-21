import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "../../store/reducers/auth";
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "../../routes";

import CustomLayout from "../Layout"

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store={store}>
        <Router>
            <CustomLayout>
                <BaseRouter />
            </CustomLayout>
        </Router>
    </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
    const tree = renderer
        .create(<Provider store={store}>
            <Router>
                <CustomLayout>
                    <BaseRouter />
                </CustomLayout>
            </Router>
        </Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});