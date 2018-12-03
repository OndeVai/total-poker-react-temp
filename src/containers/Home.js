import React, {Component} from "react";
import {Row, Col, Panel, Button, Form} from "react-bootstrap";
import Login from "./Login";
import Signup from './Signup';
import "./Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: true
        };
    }

    toggleLoginSignUp = () => {
        this.setState({
            showLogin: !this.state.showLogin
        })
    }

    render() {

        const {showLogin} = this.state;
        return (
            <div className="Home">
                <Row>
                    <Col md={8}>
                        <div className="temp" style={{height: '293px'}}>
                            <h1>[Ad]</h1>
                        </div>
                    </Col>
                    <Col md={4}>
                        <Panel>
                            <div className="Login">
                                {showLogin && <Login compact/>}
                                {!showLogin && <Signup compact/>}
                                <Button
                                    type="button"
                                    block
                                    bsSize="large"
                                    className="register"
                                    onClick={this.toggleLoginSignUp}>
                                    {!showLogin ? "Login" : "Join Now"}
                                </Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="temp" style={{height: '600px'}}>
                            <h1>[Shedule,Leagues,Standings]</h1>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
