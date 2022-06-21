import React from 'react';
import Background_car from '../Images/Dashboard/carbg.png';
import img from '../Images/Dashboard/redcar.png';
import Background_alarm from '../Images/Dashboard/babg.png';
import burgler_img from '../Images/Dashboard/burgler.png';
import { connect } from "react-redux";
import { Segment, Header, Icon, Menu, Container, Button, Grid, Portal, Label } from "semantic-ui-react";
import Sound from 'react-sound';  //npm install react-sound --save
import burglersound from '../sounds/burgler.mp3';
import carsound1 from '../sounds/car rev 1.mp3';
import carsound2 from '../sounds/car rev 2.mp3';
import carsound3 from '../sounds/car rev 3.mp3';
import { SoundContext } from "../SoundContext";

var BurglerAlerts_Log = "";
var BurglerAlerts_Count = 0;
var movingAvg = [];
var smoothingWindow = 10;
var threshold = 300;
// var imgUrl;
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: true,                                               //To select item from menu: true for car, false for BA  
            node_pos_alarm: 0,
            open: false,                                                    //Used for alarm module. If true => motion detected within threshold
            time: new Date().toLocaleString(),
            pos_car: 0,
            node_pos_car: 0,
            burglar_distance: 0
        }
        this.phpSocket = this.props.phpSocket;
    }

    componentDidMount() {
        this.phpSocket.onmessage = (e) => {
            this.writearray_alarm(e.data);
            this.writearray_car(e.data);
        };
        this.phpSocket.onclose = (e) => {
            console.error('Php socket closed unexpectedly');
        };
    }
    ActiveCar = () => {                                                     //if activeItem = true => Car
        this.setState({ activeItem: true });
    }

    ActiveBA = () => {                                                      //if activeItem = false => Burgler Alarm
        this.setState({ activeItem: false });
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    changeState() {
        if (!this.state.open && !this.state.activeItem) {                      //if open is false and activeItem is false
            this.setState({ open: true })
        }
    }

    clearLog = () => {
        BurglerAlerts_Log = " ";
        BurglerAlerts_Count = 0;
    };
    writeLog = (data) => {
        BurglerAlerts_Log = this.state.time + data + BurglerAlerts_Log;   //concatenate to previous log 
        BurglerAlerts_Count++;
    }
    writearray_alarm = (d) => {

        d = d.split('\n');
        d.splice(-1, 1);                                                     //to remove last element. As it is splitting using \n 1 extra empty element willl be added
        d = Number(d[d.length - 1]);                                         //because last element is the new incoming element
        if (isNaN(d))                                                         //handles non-numeric data
        {
            d = 0;
        }
        if (d > 400) {
            d = 400;
        }
        if (!this.state.activeItem) {
            this.setState({
                node_pos_alarm: d
            });
        }
    }

    writearray_car = (d1) => {

        d1 = d1.split('\n');
        d1.splice(-1, 1);                                                 //to remove last element. As it is splitting using \n 1 extra empty element willl be added
        d1 = Number(d1[d1.length - 1]);                                    //because last element is the new incoming element
        if (isNaN(d1))                                                    //handles non-numeric data
        {
            d1 = 0;
        }
        movingAvg.push(d1)                                               // append to array

        if (movingAvg.length >= smoothingWindow) {
            movingAvg.shift();                                          // removes first value if length reaches smoothing window (eg 10)
        }
        // get sum
        var tempAvg = 0;
        movingAvg.forEach(element => {
            tempAvg += element;
        });
        tempAvg /= movingAvg.length;                                    // get average
        if (tempAvg > 400) {                                            // condition for tempAvg going beyond threshold
            tempAvg = 400;
        }
        if (this.state.activeItem) {
            this.setState({
                node_pos_car: tempAvg
            });
        }
        tempAvg = (800 * tempAvg) / 400;                                  //Formula to map node data on screen. Movement space on screen is maximum 800 px.

        if (this.state.activeItem) {
            this.setState({
                pos_car: tempAvg
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.node_pos_alarm < threshold && this.state.node_pos_alarm !== prevState.node_pos_alarm) {
            this.changeState();

        }
        if (this.state.open !== prevState.open && this.state.open === true)  //when state.open goes from false to true means this is the first instance of movement detected within threshold. So print entry in Event Log only this one time.
        {
            // set distance at which burglar was caught
            this.setState({ burglar_distance: this.state.node_pos_alarm / 100 });
            // set time at which burglar was caught
            this.setState({ time: new Date().toLocaleString() });
            this.writeLog("  Motion Detected at " + this.state.burglar_distance + " meters.\n");
        }
    }
    render() {
        const { open } = this.state;
        var imgUrl = this.state.activeItem ? Background_car : Background_alarm;      //if activeItem = true => Car =>Car background
        var add_border = this.state.activeItem ? null : (this.state.open ? "inset 0px 0px 2px 80px red" : null);  //if open = true => movement detected => add border
        var add_burgler = this.state.activeItem ? null : (this.state.open ? burgler_img : null);
        var car_sound = this.state.node_pos_car > 100 ? null : (this.state.node_pos_car > 50 ? carsound1 : (this.state.node_pos_car > 10 ? carsound2 : carsound3));


        var sectionStyle = {
            width: "100%",
            height: "750px",
            backgroundImage: 'url(' + imgUrl + ')',
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: 'center',
            boxShadow: add_border,
        };
        return (
            <div>

                <Segment style={{ marginTop: '4em', textAlign: "center" }} vertical>
                    <Header as='h3'>
                        <Icon name='dashboard' />Dashboard
                    </Header>
                </Segment>


                <Menu pointing>
                    <Menu.Item
                        name='Car'
                        onClick={this.ActiveCar}
                        id='menu_item_car'
                    />
                    <Menu.Item
                        name='Burgler Alarm'
                        onClick={this.ActiveBA}
                        id='menu_item_alarm'
                    />
                </Menu>

                <Container fluid>

                    {this.state.activeItem ? (                              //if activeItem = True => Car
                        //.........................................................Start of Car Module.........................
                        <React.Fragment>
                            <div style={sectionStyle}>
                                <div >
                                    <img src={img} alt="car" width="450" style={{ top: "593px", right: this.state.pos_car + 250 + "px", position: "absolute" }} />
                                    <p style={{ color: 'white', fontSize: '55px', top: "220px", left: "60px", position: "absolute" }}>  {(this.state.node_pos_car / 100).toFixed(2)} m</p>
                                    {/* accessing sound settings for dashboard */}
                                    <SoundContext.Consumer>
                                        {({ dashSoundOn }) => (
                                            <React.Fragment>
                                                {dashSoundOn ? (
                                                    <Sound
                                                        url={car_sound}
                                                        playStatus={Sound.status.PLAYING}
                                                        onLoading={this.handleSongLoading}
                                                        onPlaying={this.handleSongPlaying}
                                                        onFinishedPlaying={this.handleSongFinishedPlaying}
                                                    />
                                                ) : null}
                                            </React.Fragment>
                                        )}
                                    </SoundContext.Consumer>
                                </div>
                            </div>

                        </React.Fragment>
                        //..........................................................End of Car module..............................
                    ) : (
                            //.........................................................Start of Alarm Module.........................
                            <React.Fragment>
                                <div>
                                    <Grid columns={2} divided>
                                        <Portal open={open}>
                                            <Segment
                                                style={{
                                                    left: '40%',
                                                    position: 'fixed',
                                                    top: '50%',
                                                    zIndex: 1000,
                                                }}
                                            >
                                                <Header>Intruder Alert</Header>
                                                <p>The time is {this.state.time}.</p>
                                                <p>Movement detected at distance of {this.state.burglar_distance} meters. </p>
                                                {/* accessing sound settings for dashboard */}
                                                <SoundContext.Consumer>
                                                    {({ dashSoundOn }) => (
                                                        <React.Fragment>
                                                            {dashSoundOn ? (
                                                                <Sound
                                                                    url={burglersound}
                                                                    playStatus={Sound.status.PLAYING}
                                                                    onLoading={this.handleSongLoading}
                                                                    onPlaying={this.handleSongPlaying}
                                                                    onFinishedPlaying={this.handleSongFinishedPlaying}
                                                                />
                                                            ) : null}
                                                        </React.Fragment>
                                                    )}
                                                </SoundContext.Consumer>
                                                <Button
                                                    content='Reset'
                                                    negative  //red color
                                                    onClick={this.handleClose}
                                                    id='reset_burglar_button'
                                                />
                                            </Segment>
                                        </Portal>
                                        <Grid.Column style={{ left: '0.5%', width: '30%', }}>
                                            <Segment.Group>
                                                <Segment>
                                                    <Button
                                                        compact
                                                        size="small"
                                                        floated="right"
                                                        onClick={this.clearLog}
                                                        id='clear_burglar_log_button'
                                                    >
                                                        Clear
                                                    </Button>
                                                Event Log <Label circular>{BurglerAlerts_Count}</Label>
                                                </Segment>
                                                <Segment secondary>
                                                    <pre>
                                                        {BurglerAlerts_Log}
                                                    </pre>
                                                </Segment>
                                            </Segment.Group>
                                        </Grid.Column>

                                        <Grid.Column style={{ width: '70%' }}>
                                            <div style={sectionStyle}>
                                                <img src={add_burgler} width="200" style={{ top: "365px", right: "400px", position: "absolute" }} alt='' />
                                            </div>
                                        </Grid.Column>
                                    </Grid>
                                    <h1>{this.state.node_pos_alarm}</h1>
                                </div>
                            </React.Fragment>
                            //......................................................End of Alarm module..................................
                        )}
                </Container>
            </div>
        );
    }
}

export default connect(
)(Dashboard);
