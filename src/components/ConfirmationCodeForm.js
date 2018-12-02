import React, {Fragment} from "react";

import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import ErrorAlert from "./ErrorAlert"

export default ({onSubmit, onChange, value, disabled, isLoading, errorMessage, errorType}) => {

    return (
        <Fragment>
            <ErrorAlert message={errorMessage} type={errorType}/>
            <form onSubmit={onSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        value={value}
                        onChange={onChange}
                    />
                    <HelpBlock>Please check your email for the code.</HelpBlock>
                </FormGroup>
                <LoaderButton
                    block
                    bsSize="large"
                    disabled={disabled}
                    type="submit"
                    isLoading={isLoading}
                    text="Verify"
                    loadingText="Verifying…"
                />
            </form>
        </Fragment>
    );
}