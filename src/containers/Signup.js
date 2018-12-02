import React, {Component, Fragment} from "react";
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import Auth from '../services/Auth';
import ConfirmationCodeForm from "../components/ConfirmationCodeForm";
import LoaderButton from "../components/LoaderButton";
import ErrorAlert from "../components/ErrorAlert";
import "./Signup.css";

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            newUser: null,
            signUpErrorMessage: "",
            signUpErrorMessageType: "",
            confirmationErrorMessage: "",
            confirmationErrorMessageType: ""
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            const newUser = await Auth.signUp(this.state.username, this.state.password, this.state.email);
            this.setState({newUser});
        } catch (e) {
            this.handleSignUpError(e);
        }

        this.setState({isLoading: false});
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await Auth.confirmSignUp(this.state.username, this.state.confirmationCode, this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/"); //todo this will change
        } catch (e) {
            this.handleConfirmationError(e);
            this.setState({isLoading: false});
        }
    }

    handleSignUpError = e => {
        this.setState({
            signUpErrorMessage: e.message,
            signUpErrorMessageType: e.type
        });
    }

    handleConfirmationError = e => {
        this.setState({
            confirmationErrorMessage: e.message,
            confirmationErrorMessageType: e.type
        });
    }

    renderConfirmationForm() {
        return (
            <ConfirmationCodeForm
                disabled={!this.validateConfirmationForm()}
                isLoading={this.state.isLoading}
                onChange={this.handleChange}
                onSubmit={this.handleConfirmationSubmit}
                value={this.state.confirmationCode}
                errorMessage={this.state.confirmationErrorMessage}
                errorType={this.state.confirmationErrorMessageType}
            />
        );
    }

    renderForm() {
        return (
            <Fragment>
                <ErrorAlert
                    message={this.state.signUpErrorMessage}
                    type={this.state.signUpErrorMessageType}/>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="confirmPassword" bsSize="large">
                        <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Signup"
                        loadingText="Signing up…"
                    />
                </form>
            </Fragment>
        );
    }

    render() {
        return (
            <div className="Signup">
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}
