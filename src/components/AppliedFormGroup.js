import React, {Component} from "react";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldError: null
        };
    }

    handleChange = e => {
        this.handleValidation(e);
        if(this.props.onChange) this.props.onChange(e);
    }

    handleBlur = e => {
        this.handleValidation(e);
        if(this.props.onBlur) this.props.onBlur(e);
    }

    handleValidation = e =>{
        const error = this.props.validate(e);
        this.setState({
            fieldError: error
        });
    }

    getValidationState = () => {
        var error = this.state.fieldError;
        if (error) return 'error';
        return null;
    }

    render() {

        const {groupProps, validate, ...props} = this.props;
        const {labelText, ...newGroupProps} = groupProps;

        const newControlProps =
            Object.assign({}, props, {onChange: this.handleChange, onBlur: this.handleBlur})

        return (
            <FormGroup {...newGroupProps} validationState={this.getValidationState()}>
                <ControlLabel>{labelText}</ControlLabel>
                <FormControl {...newControlProps}/>
                {this.state.fieldError && <HelpBlock bsClass="text-danger">{this.state.fieldError}</HelpBlock>}
            </FormGroup>
        );
    }
}

// {this.state.emailError && <HelpBlock bsClass="text-danger">{this.state.emailError}</HelpBlock>}