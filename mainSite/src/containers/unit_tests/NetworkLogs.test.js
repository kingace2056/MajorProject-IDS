import React from "react";

import ReactDOM from "react-dom";

import { createStore, compose, applyMiddleware, combineReducers } from "redux";

import { Provider } from "react-redux";

import thunk from "redux-thunk";

import { shallow, mount } from 'enzyme';

import {
  Segment,
  Table,
  Header,
  Icon
} from "semantic-ui-react";

import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import NetworkLogs from "../NetworkLogs";
import authReducer from "../../store/reducers/auth";
configure({ adapter: new Adapter() });

var netLogs = []

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Provider store={store}><NetworkLogs netLogs={netLogs} /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});



it('createTable', () => {
  let table = []
  let headers = []
  let children = []

  // add headers to the table - column headings
  headers.push(<Table.HeaderCell key='Frame Number'>Frame Number</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='Frame Time'>Frame Time</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='Frame Length'>Frame Length</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='Mac Source'>Mac Source</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='Mac Dest'>Mac Dest</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='IP Source'>IP Source</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='IP Dest'>IP Dest</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='IP Protocol'>IP Protocol</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='IP Length'>IP Length</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='TCP Length'>TCP Length</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='TCP Source Port'>TCP Source Port</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='TCP Dest Port'>TCP Dest Port</Table.HeaderCell>);
  headers.push(<Table.HeaderCell key='Info'>Info</Table.HeaderCell>);
  table.push(<Table.Header key='header'><Table.Row>{headers}</Table.Row></Table.Header>);
  children.push(<Table.Cell>0</Table.Cell>)
  children.push(<Table.Cell>1</Table.Cell>)
  children.push(<Table.Cell>2</Table.Cell>)
  children.push(<Table.Cell>3</Table.Cell>)
  children.push(<Table.Cell>4</Table.Cell>)
  children.push(<Table.Cell>5</Table.Cell>)
  children.push(<Table.Cell>6</Table.Cell>)
  children.push(<Table.Cell>7</Table.Cell>)
  children.push(<Table.Cell>8</Table.Cell>)
  children.push(<Table.Cell>9</Table.Cell>)
  children.push(<Table.Cell>10</Table.Cell>)
  children.push(<Table.Cell>11</Table.Cell>)
  children.push(<Table.Cell>12</Table.Cell>)


  // add headers to the table - column headings

  const div = document.createElement("div");
  ReactDOM.render(<div style={{ marginLeft: '3em', marginRight: '3em' }}>
    <Segment style={{ marginTop: '4em', textAlign: "center" }} vertical>
      <Header as='h3'>
        <Icon name='connectdevelop' />Network Logs
              </Header>
    </Segment>
    <Table celled>
      {table}
    </Table>
  </div>, div)
});