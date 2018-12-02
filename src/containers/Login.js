import React, {Component, Fragment} from "react";
import {FormGroup, FormControl, ControlLabel, Alert} from "react-bootstrap";
import Auth from '../services/Auth';
import ConfirmationCodeForm from "../components/ConfirmationCodeForm";
import LoaderButton from "../components/LoaderButton";
import ErrorAlert from "../components/ErrorAlert";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            username: "",
            password: "",
            confirmationCode: "",
            showConfirmation: false,
            loginErrorMessage: "",
            loginErrorMessageType: "",
            confirmationErrorMessage: "",
            confirmationErrorMessageType: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
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
            await Auth.signIn(this.state.username, this.state.password);
            this.props.userHasAuthenticated(true);
        } catch (e) {
            if (e.code === 'UserNotConfirmedException') {
                this.setState({isLoading: false, showConfirmation: true});
            } else {
                this.handleLoginError(e);
                this.setState({isLoading: false});
            }
        }
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await Auth.confirmSignUp(this.state.username, this.state.confirmationCode, this.state.password);

            this.props.userHasAuthenticated(true);
        } catch (e) {
            this.handleConfirmationError(e);
            this.setState({isLoading: false});
        }
    }

    handleLoginError = e => {
        this.setState({
            loginErrorMessage: e.message,
            loginErrorMessageType: e.type,
            showConfirmation: false
        });
    }

    handleConfirmationError = e => {
        if(e.code==='NotAuthorizedException'){
            this.handleLoginError(e);
            return;
        }

        this.setState({
            confirmationErrorMessage: e.message,
            confirmationErrorMessageType: e.type
        });
    }


    renderForm() {
        return (
            <Fragment>
                <ErrorAlert
                    message={this.state.loginErrorMessage}
                    type={this.state.loginErrorMessageType}/>
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
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
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
                        text="Login"
                        loadingText="Logging in…"
                    />
                </form>
            </Fragment>
        );
    }

    renderConfirmationForm() {
        return (
            <Fragment>
                <Alert bsStyle="warning">
                    <h4>
                        You have not yet confirmed your account via email.
                    </h4>
                    <p> Please enter the code sent to the email address associated with your account.
                        If you cannot find the confirmation email, you can click on "Re-send code"
                        below.</p>
                </Alert>
                <ConfirmationCodeForm
                    disabled={!this.validateConfirmationForm()}
                    isLoading={this.state.isLoading}
                    onChange={this.handleChange}
                    onSubmit={this.handleConfirmationSubmit}
                    value={this.state.confirmationCode}
                    errorMessage={this.state.confirmationErrorMessage}
                    errorType={this.state.confirmationErrorMessageType}
                />
            </Fragment>
        );
    }

    render() {
        return (
            <div className="Login">
                {!this.state.showConfirmation
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}
