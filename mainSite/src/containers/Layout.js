import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  // Image,
  List,
  Menu,
  Segment,
  Icon,
  Dropdown,
  Radio
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { SoundContext } from "../SoundContext";
import axios from 'axios';
import { store } from 'react-notifications-component';

class CustomLayout extends React.Component {

  // call api from django to restart tshark script
  restart_tshark = () => {
    axios.get(`http://` + window.location.host + `/api-restart-tshark/`)
      .then(res => {
        console.log('Restarted Tshark');
      })
    // create notification for tshark script restart
    store.addNotification({
      title: "Restarting Tshark script.",
      message: "Please wait till script restarts. Refresh browser if logs don't update.",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 7000,
        onScreen: true,
        pauseOnHover: true
      }
    });
  }

  trigger = (
    <span>
      <Icon name='setting' inverted color='teal' style={{ display: 'inline-block', paddingLeft: '2em' }} />
    </span>
  )

  // function to display settings menu on top of the layout
  // contains toggle switches to turn on/off notification and dashboard sound
  settingsMenu = () => {
    return (
      // user consumer of sound context to access globar variables notifSoundOn, dashSoundOn, toggleNotifSound, toggleDashSound
      <SoundContext.Consumer>
        {({ notifSoundOn, dashSoundOn, toggleNotifSound, toggleDashSound }) => (
          <Dropdown item={true} trigger={this.trigger} multiple={true} style={{ marginLeft: 'auto', marginRight: 0 }} id='ddown_item_settings'>
            <Dropdown.Menu>
              {/* notifications sound setting */}
              <Dropdown.Item>
                <span style={{ display: 'inline-block', paddingBottom: '1em' }}>Notification sound</span>
                <Radio
                  checked={notifSoundOn}
                  onChange={toggleNotifSound}
                  toggle
                  style={{ display: 'inline-block', paddingTop: '1em', paddingLeft: '1em' }}
                ></Radio>
              &nbsp;&nbsp;&nbsp;
            </Dropdown.Item>
              {/* dashboard sound setting */}
              <Dropdown.Item>
                <span style={{ display: 'inline-block', paddingBottom: '1em' }}>Dashboard sound&nbsp;&nbsp;</span>
                <Radio
                  checked={dashSoundOn}
                  onChange={toggleDashSound}
                  toggle
                  style={{ display: 'inline-block', paddingLeft: '1em' }}
                ></Radio>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </SoundContext.Consumer>
    )
  }

  render() {
    const { authenticated } = this.props;

    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Link to="/">
              <Menu.Item header id='menu_item_home'><Icon inverted name='home' /> Home</Menu.Item>
            </Link>
            {authenticated ?
              // if logged in - authenticated
              (
                <React.Fragment>

                  <Link to="/networkLogs">
                    <Menu.Item header id='menu_item_network_logs'><Icon inverted name='connectdevelop' /> Network Logs</Menu.Item>
                  </Link>
                  <Link to="/dashboard">
                    <Menu.Item header id='menu_item_dashboard'><Icon inverted name='dashboard' /> Dashboard</Menu.Item>
                  </Link>
                  <Link to="/visualisations">
                    <Menu.Item header id='menu_item_visualisations'><Icon inverted name='line graph' /> Visualisations</Menu.Item>
                  </Link>
                  <Link to="/notifications">
                    <Menu.Item header id='menu_item_notifications'><Icon inverted name='bell' /> Notifications</Menu.Item>
                  </Link>

                  <Menu.Menu position='right'>
                    {/* tshark restart */}
                    <Menu.Item header id='menu_item_tshark' onClick={() => this.restart_tshark()}><Icon inverted name='redo' /> Tshark</Menu.Item>
                    {/* settings panel */}
                    <this.settingsMenu></this.settingsMenu>
                    {/* logout */}
                    <Link to="/">
                      <Menu.Item header id='menu_item_logout' onClick={() => this.props.logout()}>
                        <Icon inverted name='log out' /> Logout
                      </Menu.Item>
                    </Link>
                  </Menu.Menu>

                </React.Fragment>
              ) :
              // if NOT logged in - NOT authenticated
              (
                <React.Fragment>
                  <Link to="/login">
                    <Menu.Item header id='menu_item_login'><Icon inverted name='sign-in' /> Login</Menu.Item>
                  </Link>
                  <Link to="/signup">
                    <Menu.Item header id='menu_item_signup'><Icon inverted name='signup' /> Signup</Menu.Item>
                  </Link>
                  {/* <Link to="/networkLogs">
                    <Menu.Item header id='menu_item_network_logs'><Icon inverted name='connectdevelop' /> Network Logs</Menu.Item>
                  </Link>
                  <Link to="/dashboard">
                    <Menu.Item header id='menu_item_dashboard'><Icon inverted name='dashboard' /> Dashboard</Menu.Item>
                  </Link>
                  <Link to="/visualisations">
                    <Menu.Item header id='menu_item_visualisations'><Icon inverted name='line graph' /> Visualisations</Menu.Item>
                  </Link>
                  <Link to="/notifications">
                    <Menu.Item header id='menu_item_notifications'><Icon inverted name='bell' /> Notifications</Menu.Item>
                  </Link>
                  <this.settingsMenu></this.settingsMenu> */}
                </React.Fragment>
              )}
          </Container>
        </Menu>

        {this.props.children}

        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group Members" />
                <List link inverted>
                  <List.Item as="a">Shruti Houji</List.Item>
                  <List.Item as="a">Rhishabh Hattarki</List.Item>
                  <List.Item as="a">Sahil Dixit</List.Item>
                  <List.Item as="a">Sanika Patil</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="PRN Number" />
                <List link inverted>
                  <List.Item as="a">71707035C</List.Item>
                  <List.Item as="a">71707027B</List.Item>
                  <List.Item as="a">71706924K</List.Item>
                  <List.Item as="a">71707451L</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Guide" />
                <List link inverted>
                  <List.Item as="a">M. R. Dhage</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header style={{ paddingTop: '3em' }} inverted as="h4" content="Anomaly Based Intrusion Detection System For IoT Networks Using Random Forest" />
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            {/* <Image centered size="mini" src="/logo.png" /> */}
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="https://github.com/s3r-be/be-project" target='_blank' id='github_link'>
                Click here to check the code on Github
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
