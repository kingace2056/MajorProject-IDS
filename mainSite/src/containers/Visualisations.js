import React from "react";
import model from "../Images/Visualisations/model.png";
import Matrix from "../Images/Visualisations/normalized_confusion.png";
import Corr from "../Images/Visualisations/Correlation.png";
import WithOverProtocolI from "../Images/Visualisations/pOversampled.png";
import WithoutOverProtocolI from "../Images/Visualisations/protoc.png";
import toa from "../Images/Visualisations/TypeofAttacks.png";
import Otoa from "../Images/Visualisations/Oversampling.png";
import main from "../Images/Visualisations/main.png";
import { connect } from "react-redux";
import {
    Button,
    Segment,
    Header,
    Icon,
    Container
} from "semantic-ui-react";


class Visualisations extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            path: main
        }
    }
    Disable = () => {
        this.setState({ path: main });
    }
    ModelComparison = () => {
        this.setState({ path: model });
        // console.log(this.state.path)
    }
    ConfusionMatrix = () => {
        this.setState({ path: Matrix });
        // console.log(this.state.path)
    }
    Correction = () => {
        this.setState({ path: Corr });
        // console.log(this.state.path)
    }
    WithoutOverProtocol = () => {
        this.setState({ path: WithoutOverProtocolI });
        // console.log(this.state.path)
    }
    WithOverProtocol = () => {
        this.setState({ path: WithOverProtocolI });
        // console.log(this.state.path)
    }
    OAttackDis = () => {
        this.setState({ path: Otoa });
        // console.log(this.state.path)
    }
    AttackDis = () => {
        this.setState({ path: toa });
        // console.log(this.state.path)
    }
    render() {
        return (
            <div style={{ marginLeft: '3em', marginRight: '3em' }}>

                <Segment style={{ marginTop: '4em', textAlign: "center" }} vertical>
                    <Header as='h3'>
                        <Icon name='line graph' />Visualisations
                    </Header>
                </Segment>

                <Container>
                    <Segment size="massive" style={{ padding: "0.5em 0.1em" }} horizontal='true'>
                        <Button.Group>
                            <Button size="mini" color='black' id='ModelComparison' onClick={this.ModelComparison}>Model Comparison</Button>
                            <Button size="mini" color='black' id='ConfusionMatrix' onClick={this.ConfusionMatrix}>Confusion Matrix</Button>
                            <Button size="mini" color='black' id='Correction' onClick={this.Correction}>Correlation Matrix</Button>
                            <Button size="mini" color='black' id='WithOverProtocol' onClick={this.WithOverProtocol}>Protocol(Oversampled)</Button>
                            <Button size="mini" color='black' id='WithoutOverProtocol' onClick={this.WithoutOverProtocol}>Protocol</Button>
                            <Button size="mini" color='black' id='OAttackDis' onClick={this.OAttackDis}>Attacks(Oversampled)</Button>
                            <Button size="mini" color='black' id='AttackDis' onClick={this.AttackDis}>Attacks</Button>
                            <Button size="mini" id='Disable' onClick={this.Disable}> Disable</Button>
                        </Button.Group>
                    </Segment>
                    <Segment style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={this.state.path} alt="" width="80%" height="550px" ></img>
                    </Segment>
                </Container>
            </div >
        );
    }
}

export default connect(
)(Visualisations);