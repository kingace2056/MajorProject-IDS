import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import "semantic-ui-css/semantic.min.css";
import CustomLayout from "./containers/Layout";
import { store } from 'react-notifications-component';
import Sound from 'react-sound';
import attack_sound from './sounds/attack notif 1.mp3';
import scan_sound from './sounds/attack notif 2.mp3';
import { SoundContext } from './SoundContext';

class App extends Component {

  constructor(props) {
    super(props);
    // get attack notif socket that was created in index
    this.attackNotif = props.attackNotif;
    this.chatSocket = props.chatSocket;
    this.state = {
      // list of all the attack notifications
      // using local storage to store the state in session, so it doesn't get reset after page reload
      notifList: localStorage.getItem('notifList') == null ? [] : JSON.parse(localStorage.getItem('notifList')),
      // list of all the network logs
      netLogs: [],
      // max number of records to store in netlogs
      netLogsLengthThresh: 1000,
      // dictionary to maintain the number of each attack
      // using local storage to store the state in session, so it doesn't get reset after page reload
      attackStats: localStorage.getItem('attackStats') == null ? {
        'Wrong Setup': 0,
        'DDOS': 0,
        'Data Type Probing': 0,
        'Scan Attack': 0,
        'MITM': 0
      } : JSON.parse(localStorage.getItem('attackStats')),
      // used to set off notification sound
      play_attack_rcvd: false,
      play_scan_rcvd: false,
      // used to control toggle of sound setting
      // using local storage to store the settings in session variables so settings are not reset after page reload
      notifSoundOn: localStorage.getItem('notifSoundOn') == null ? true : (localStorage.getItem('notifSoundOn') == 'true' ? true : false),
      dashSoundOn: localStorage.getItem('dashSoundOn') == null ? true : (localStorage.getItem('dashSoundOn') == 'true' ? true : false),
      toggleNotifSound: this.toggleNotifSound,
      toggleDashSound: this.toggleDashSound
    }
  }

  toggleNotifSound = () => {
    this.setState((prevState) => ({ notifSoundOn: !prevState.notifSoundOn }), () => {
      // console.log('toggled notif sound- ' + this.state.notifSoundOn);
      localStorage.setItem('notifSoundOn', this.state.notifSoundOn);
    })
  }

  toggleDashSound = () => {
    this.setState((prevState) => ({ dashSoundOn: !prevState.dashSoundOn }), () => {
      // console.log('toggled dash sound- ' + this.state.dashSoundOn);
      localStorage.setItem('dashSoundOn', this.state.dashSoundOn);
    })
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    // ----------------------------------------------------------------------- attack notif start

    // on receiving message
    this.attackNotif.onmessage = (e) => {

      var data = JSON.parse(e.data);

      // create notifications only when authenticated (logged in)
      if (this.props.isAuthenticated) {

        // yellow notif and different sound for scan attack - passive
        if (data['attack.type'] === 'Scan Attack') {
          this.setState({ play_scan_rcvd: true });
          // console.log('play_scan_rcvd: ' + this.state.play_scan_rcvd);
          setTimeout(function () { //Start the timer
            this.setState({ play_scan_rcvd: false }); //After 1 second, set render to true
            // console.log('play_scan_rcvd: ' + this.state.play_scan_rcvd);
          }.bind(this), 1000);

          // create notification for attack detected
          store.addNotification({
            title: " Attack detected! - " + data['attack.type'],
            message: data['frame.time'],
            type: "warning",
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
        } else {
          // create notification for attack detected
          store.addNotification({
            title: " Attack detected! - " + data['attack.type'],
            message: data['frame.time'],
            type: "danger",
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

          // to activate notif sound
          this.setState({ play_attack_rcvd: true });
          // reset notif_rcvd
          // console.log('play_attack_rcvd: ' + this.state.play_attack_rcvd);
          setTimeout(function () { //Start the timer
            this.setState({ play_attack_rcvd: false }); //After 1 second, set render to true
            // console.log('play_attack_rcvd: ' + this.state.play_attack_rcvd);
          }.bind(this), 1000);
        }

        // move to notifications page after clicking on the notification
        document.getElementsByClassName('notification-parent')[0].setAttribute('onClick', 'window.location.href = "/notifications";');
      }

      // appending received message to state
      this.setState(prevState => ({
        notifList: [...prevState.notifList, data],
        // set the stats of current attack type to one more than previous (increment count)
        attackStats: { ...prevState.attackStats, [data['attack.type']]: prevState.attackStats[data['attack.type']] + 1 }
      }), () => {
        // saving the state of notif list and attack stats in session (local storage) - get it back after page reload
        localStorage.setItem('notifList', JSON.stringify(this.state.notifList));
        localStorage.setItem('attackStats', JSON.stringify(this.state.attackStats));
      })
      // console.log('attack notif: ' + data.message);
      // console.log('state notif list: ', this.state.notifList);
    };

    // on closing web socket
    this.attackNotif.onclose = (e) => {
      console.error('attackNotif socket closed unexpectedly');
    };

    // ----------------------------------------------------------------------- attack notif end

    // ----------------------------------------------------------------------- chat socket start

    // on receiving message
    this.chatSocket.onmessage = (e) => {
      var data = JSON.parse(e.data);

      // check if length of netLogs is greater than threshold
      // if yes delete first rows of netLogs
      var oNetLogs = this.state.netLogs;
      while (oNetLogs.length > this.state.netLogsLengthThresh) {
        oNetLogs.shift();
      }

      // appending received message to state
      oNetLogs.push(data);
      this.setState({
        netLogs: oNetLogs
      });

      // console.log(data);
      // console.log('state netLogs: ', this.state.netLogs);
    };

    // on closing web socket
    this.chatSocket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly');
    };

    // ----------------------------------------------------------------------- chat socket end
  }

  // pass attack notif socket to custom layout and pass chat socket to base router (for network log)
  render() {
    return (
      <React.Fragment>
        {/* play sound only if notifSoundOn from settings tab is active (true) */}
        {this.state.notifSoundOn ? (
          <React.Fragment>
            {/* sound for active attacks */}
            {this.state.play_attack_rcvd ?
              (<Sound
                url={attack_sound}
                playStatus={Sound.status.PLAYING}
                onLoading={this.handleSongLoading}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}
              />) : (<div></div>)
            }
            {/* sound for passive attacks */}
            {this.state.play_scan_rcvd ?
              (<Sound
                url={scan_sound}
                playStatus={Sound.status.PLAYING}
                onLoading={this.handleSongLoading}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}
              />) : (<div></div>)
            }
          </React.Fragment>
        ) : null}

        {/* using sound context to pass sound variables and functions 
        to enable/disable sound for notif and dash from settings tab */}
        <SoundContext.Provider value={this.state}>
          <Router>
            <CustomLayout>
              <BaseRouter netLogs={this.state.netLogs} notifList={this.state.notifList}
                attackStats={this.state.attackStats} phpSocket={this.props.phpSocket} />
            </CustomLayout>
          </Router>
        </SoundContext.Provider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
