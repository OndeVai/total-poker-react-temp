import React, {Component} from "react";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import RequiredIndicator from "./RequiredIndicator"

class AppliedFormGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldError: null
        };
    }

    handleChange = e => {
        this.handleValidation(e);
        if (this.props.onChange) this.props.onChange(e);
    }

    handleBlur = e => {
        this.handleValidation(e);
        if (this.props.onBlur) this.props.onBlur(e);
    }

    handleValidation = e => {
        const {controlId, labelText} = this.props.groupProps;
        const {validator, compareTo} = this.props;
        const validationFunc = validator[`${controlId}Error`]; //todo e.target.id
        if(!validationFunc) return;

        let error = validationFunc(e.target.value, compareTo);
        if(error) error = `${labelText} ${error}`;
        this.setState({
            fieldError: error
        });
    }

    getValidationState = () => {
        if (this.state.fieldError) return 'error';
        return null;
    }

    render() {

        const {groupProps, validator, compareTo, ...props} = this.props;
        const {labelText, ...newGroupProps} = groupProps;
        newGroupProps.bsSize = newGroupProps.bsSize || 'large';

        const newControlProps =
            Object.assign({}, props, {onChange: this.handleChange, onBlur: this.handleBlur})

        const requiredIndicator = newControlProps.required ? <RequiredIndicator/> : null;
        return (
            <FormGroup {...newGroupProps} validationState={this.getValidationState()}>
                <ControlLabel>{labelText}{requiredIndicator}</ControlLabel>
                <FormControl {...newControlProps}/>
                {this.state.fieldError && <HelpBlock bsClass="text-danger">
                    <small>{this.state.fieldError}</small>
                </HelpBlock>}
            </FormGroup>
        );
    }
}


export default AppliedFormGroup;