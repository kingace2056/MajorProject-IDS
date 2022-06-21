import React from "react";
import { connect } from "react-redux";
import {
    Segment,
    Table,
    Header,
    Icon,
    Statistic,
} from "semantic-ui-react";

class Notifications extends React.Component {

    componentDidUpdate() {
        // console.log('attacks state in notifications.js', this.props.attackStats);
    }

    // table to display attack notifications
    createTable = () => {
        let table = []
        let headers = [];

        // add headers to the table
        headers.push(<Table.HeaderCell key='Attack Type' style={{ color : 'red' }}>Attack Type</Table.HeaderCell>);
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
        for (let i = this.props.notifList.length - 1; i >= 0; i--) {
            let children = []
            let attackColor = this.props.notifList[i]['attack.type'] === 'Scan Attack' ? 'orange' : 'red';
            children.push(<Table.Cell style={{ color : attackColor }}>{this.props.notifList[i]['attack.type']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['frame.number']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['frame.time']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['frame.len']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['eth.src']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['eth.dst']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['ip.src']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['ip.dst']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['ip.proto']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['ip.len']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['tcp.len']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['tcp.srcport']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['tcp.dstport']}</Table.Cell>)
            children.push(<Table.Cell>{this.props.notifList[i]['_ws.col.Info']}</Table.Cell>)
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
                        <Icon name='bell' />Attack Notifications
                    </Header>
                </Segment>

                {/* attack statistics - display number of each attack */}
                <Segment>
                    <Statistic.Group widths='five'>
                        <Statistic size='mini'>
                            <Statistic.Value>{this.props.attackStats['Wrong Setup']}</Statistic.Value>
                            <Statistic.Label>Wrong Setup</Statistic.Label>
                        </Statistic>

                        <Statistic size='mini'>
                            <Statistic.Value>{this.props.attackStats['DDOS']}</Statistic.Value>
                            <Statistic.Label>DDOS</Statistic.Label>

                        </Statistic>
                        <Statistic size='mini'>
                            <Statistic.Value>{this.props.attackStats['Data Type Probing']}</Statistic.Value>
                            <Statistic.Label>Data Type Probing</Statistic.Label>
                        </Statistic>

                        <Statistic size='mini'>
                            <Statistic.Value>{this.props.attackStats['Scan Attack']}</Statistic.Value>
                            <Statistic.Label>Scan Attack</Statistic.Label>
                        </Statistic>

                        <Statistic size='mini'>
                            <Statistic.Value>{this.props.attackStats['MITM']}</Statistic.Value>
                            <Statistic.Label>MITM</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Segment>

                <Table celled>
                    {this.createTable()}
                </Table>
            </div>
        );
    }
}

export default connect(
)(Notifications);