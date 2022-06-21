import React from "react";
import { connect } from "react-redux";
import {
    Segment,
    Table,
    Header,
    Icon
} from "semantic-ui-react";

class NetworkLogs extends React.Component {

    componentDidUpdate() {
        // const netLogs = this.props.netLogs;
        // console.log('net Logs in NetworkLogs.js', netLogs);
    }

    createTable = () => {
        let table = []
        let headers = [];

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

        // Outer loop to create parent
        for (let i = this.props.netLogs.length - 1; i >= 0; i--) {
            let children = []
            // push children - add column values here
            children.push(<Table.Cell>{this.props.netLogs[i]['frame.number']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['frame.time']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['frame.len']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['eth.src']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['eth.dst']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['ip.src']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['ip.dst']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['ip.proto']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['ip.len']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['tcp.len']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['tcp.srcport']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['tcp.dstport']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.netLogs[i]['_ws.col.Info']}</Table.Cell>)
            //Create the parent and add the children
            table.push(<Table.Body><Table.Row children={children} /></Table.Body>)
        }

        return table
    }

    render() {
        return (
            <div style={{ marginLeft: '3em', marginRight: '3em' }}>
                <Segment style={{ marginTop: '4em', textAlign: "center" }} vertical>
                    <Header as='h3'>
                        <Icon name='connectdevelop' />Network Logs
                    </Header>
                </Segment>
                <Table celled>
                    {this.createTable()}
                </Table>
            </div>
        );
    }
}

export default connect(
)(NetworkLogs);