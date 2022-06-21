import PropTypes from "prop-types";

import React, { Component } from "react";

// import ReadMoreReact from 'read-more-react';

import {
  Container,
  Grid,
  Header,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Card
} from "semantic-ui-react";

import ids from '../Images/Home/IDS.webp';
import ddos from '../Images/Home/ddos.jpg';
import dtype from '../Images/Home/dtype.jpg';
import mitm from '../Images/Home/mitm.jpeg';
import scan from '../Images/Home/scan.jpg';
import wrong from '../Images/Home/wrong.jpeg';

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "3em", color: "black" }}>
              Intrusion Detection System
            </Header>
            <p style={{ fontSize: "1.5em", color: "#3d3b3b" }}>
              An intrusion detection system is one such system that can be a building block in
              making the IOT network as secure as possible, that passively monitors the data exchange
              in the network and of the network with externals entities and looks for malicious
              activities that can be classified as an intrusion or attack.
            </p>
            <Header as="h3" style={{ fontSize: "3em", color: "black" }}>
              We care about Protection
            </Header>
            <p style={{ fontSize: "1.5em", color: "#3d3b3b" }}>
              Includes IOT networks like CCTVs, smoke detectors, fire alarms, speaker systems, thermostats, vending machines, etc.
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <img
              alt='ids'
              size="large"
              src={ids}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <br />
            <br />
            <br />
            <Header as="h3" style={{ fontSize: "2em", color: "black" }}>
              CHECK OUT THE ATTACKS DETECTED
        </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em", display: 'flex', justifyContent: 'center' }}>

            <Card align="center">
              <img alt='ddos' src={ddos} height="200" />
              <Card.Content>
                <Card.Header>DDOS ATTACK</Card.Header>
                <Card.Description>
                  A distributed denial-of-service (DDoS) attack is a malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic
                 </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em", display: 'flex', justifyContent: 'center' }}>
            <Card>
              <img alt='dtype' src={dtype} height="200" />
              <Card.Content>
                <Card.Header>DATA TYPE PROBING ATTACK</Card.Header>
                <Card.Description>
                  Probing is a type of attack in which the intruder scans network devices to determine weakness in topology design or some opened ports and then use them in the future for illegal access to personal information                 </Card.Description>
              </Card.Content>
            </Card>

          </Grid.Column>

          <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em", display: 'flex', justifyContent: 'center' }}>
            <Card>
              <img alt='scan' src={scan} height="200" />
              <Card.Content>
                <Card.Header>SCAN ATTACK</Card.Header>
                <Card.Description>
                  A port scan is an attack that sends client requests to a range of server port addresses on a host, with the goal of finding an active port and exploiting a known vulnerability of that service
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>


          <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em", display: 'flex', justifyContent: 'center' }}>
            <Card>
              <img alt='wrong' src={wrong} height="200" />
              <Card.Content>
                <Card.Header>WRONG SETUP ATTACK</Card.Header>
                <Card.Description>
                  It is a type of attack where attackers attempt to remove the connection or manipulate the connection of the IOT network
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column style={{ paddingBottom: "2em", paddingTop: "2em", display: 'flex', justifyContent: 'center' }}>
            <Card>
              <img alt='mitm' src={mitm} height="200" />
              <Card.Content>
                <Card.Header>MAN IN THE MIDDLE ATTACK</Card.Header>
                <Card.Description>
                  It is an attack where the attacker secretly relays and possibly alters the communications between two parties who believe that they are directly communicating with each other
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

        </Grid.Row>

      </Grid>
    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em", color: "black" }}>
          Overall working of the System
        </Header>
        <p style={{ fontSize: "1.33em", color: "#3d3b3b" }}>
          This IDS is designed to run in the background of an IoT network, where distance data is processed and sent from the node (combination of ultrasonic sensor, Arduino, Nodemcu) to the apache server. The network traffic is monitored using Tshark and dumped into a csv file. The python script in the backend reads this csv file, preprocesses it and feeds it to the ML model. If an intrusion is detected, it is notified to the user on the front end.
          The ML model Random Forest is used as its accuracy was proven to be better than any other model that was tested. The model was trained using the data collected from the IoT network traffic.
        </p>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;


