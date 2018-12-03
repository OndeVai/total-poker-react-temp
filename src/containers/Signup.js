import React, {Component, Fragment} from "react";
import {HelpBlock} from "react-bootstrap";

import Auth from '../services/Auth';

import SignupValidator from "../services/validators/SignupValidator";
import ConfirmationCodeForm from "../components/ConfirmationCodeForm";
import LoaderButton from "../components/LoaderButton";
import ErrorAlert from "../components/ErrorAlert";
import AppliedFormGroup from "../components/AppliedFormGroup";
import RequiredIndicator from "../components/RequiredIndicator"
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

    validateForm() {
        return !SignupValidator.errorsAll(this.state);
    }

    validateConfirmationForm(){
        return !SignupValidator.confirmationCodeError(this.state.confirmationCode)
    }

    renderForm() {
        const compact = this.props.compact;
        return (
            <Fragment>
                {!compact && <h1>Join Now</h1>}
                <ErrorAlert
                    message={this.state.signUpErrorMessage}
                    type={this.state.signUpErrorMessageType}/>
                <form onSubmit={this.handleSubmit} noValidate>
                    <AppliedFormGroup
                        groupProps={{controlId: 'username', labelText: 'Username', hideLabel: compact}}
                        validator={SignupValidator}
                        required
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <AppliedFormGroup
                        groupProps={{controlId: 'email', labelText: 'Email', hideLabel: compact}}
                        validator={SignupValidator}
                        required
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <AppliedFormGroup
                        groupProps={{controlId: 'password', labelText: 'Password', hideLabel: compact}}
                        validator={SignupValidator}
                        required
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <AppliedFormGroup
                        groupProps={{controlId: 'confirmPassword', labelText: 'Confirm Password', hideLabel: compact}}
                        validator={SignupValidator}
                        required
                        type="password"
                        value={this.state.confirmPassword}
                        compareTo={this.state.password}
                        onChange={this.handleChange}
                    />
                    {!compact && <HelpBlock><RequiredIndicator/> indicates required field</HelpBlock>}
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Signup"
                        bsStyle="success"
                        loadingText="Signing up…"
                        active
                    />
                </form>
            </Fragment>
        );
    }

    render() {
        return (
            <div className={this.props.compact ? null : "Signup"}>
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}
