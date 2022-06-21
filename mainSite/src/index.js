import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import authReducer from "./store/reducers/auth";
import ReconnectingWebSocket from 'reconnecting-websocket';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

// create socket for network logs
const roomName = 'lobby';
const chatSocket = new ReconnectingWebSocket(
  'ws://' + window.location.host +
  '/ws/chat/' + roomName + '/');

// create socket for notification
const attackNotif = new ReconnectingWebSocket(
  'ws://' + window.location.host +
  '/ws/attackNotif/');

// create socket for notification
const phpSocket = new ReconnectingWebSocket(
  'ws://' + window.location.host +
  '/ws/phpSocket/');

// once chatSocket web socket has opened
chatSocket.onopen = (e) => {
  // send message to initiate network log data transfer
  chatSocket.send(JSON.stringify({
    'message': 'initiate network log data transfer'
  }))
}

phpSocket.onopen = (e) => {
  phpSocket.send(JSON.stringify({                            // send message to initiate notification data transfer
    'message': 'initiate node data transfer'
  }))
}

// once attackNotif web socket has opened
attackNotif.onopen = (e) => {
  // send message to initiate notification data transfer
  attackNotif.send(JSON.stringify({
    'message': 'initiate notification transfer'
  }))
}

// pass sockets as props - so only one instance created here is maintained
const app = (
  <Provider store={store}>
    <ReactNotification />
    <App chatSocket={chatSocket} attackNotif={attackNotif} phpSocket={phpSocket} />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
