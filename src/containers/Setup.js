import React, {Component, Fragment} from "react";
import {Row, Col, Panel, Form, FormGroup, InputGroup, FormControl, ControlLabel} from "react-bootstrap";
import Text from "../services/Text";
import AppliedFormGroup from "../components/AppliedFormGroup";
import LoaderButton from "../components/LoaderButton";


import "./Setup.css";

export default class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            type: 'league',
            account: {}
        };
    }


    handleShowStep = (step, type) => {
        const account = step === 1 ? {} : this.state.account;
        this.setState({
            step,
            type,
            account
        })
    }

    handleChange = event => {
        const account = Object.assign({}, this.state.account, {[event.target.id]: event.target.value})
        this.setState({
            account
        });
    }

    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        event.preventDefault();

        console.log('handleSubmit', this.state);
    }

    renderOrgForm(type) {
        const nameLabel = Text.capitalizeFirstLetter(type);
        return (
            <div className="step step-2">
                <h2>{`Create a ${nameLabel}`}</h2>
                <h3>Basic Info</h3>
                <AppliedFormGroup
                    groupProps={{controlId: 'name', labelText: `${nameLabel} Name`}}
                    //validator={LoginValidator} //todo
                    required
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <FormGroup controlId="urlPrefix">
                    <ControlLabel>Url Prefix</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                        <FormControl type="text" onChange={this.handleChange}/>
                        <InputGroup.Addon>.00</InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <AppliedFormGroup
                    groupProps={{controlId: 'urlPrefix', labelText: `Logo`}}
                    required
                    type="file"
                    onChange={this.handleFileChange}
                />
                {type === 'venue' && (
                    <Fragment>
                        <AppliedFormGroup
                            groupProps={{controlId: 'street', labelText: 'Street'}}
                            required
                            type="text"
                            value={this.state.steet}
                            onChange={this.handleChange}
                        />
                        <AppliedFormGroup
                            groupProps={{controlId: 'street2', labelText: 'Street 1'}}
                            required
                            type="text"
                            value={this.state.street2}
                            onChange={this.handleChange}
                        />
                        <AppliedFormGroup
                            groupProps={{controlId: 'city', labelText: 'City'}}
                            required
                            type="text"
                            value={this.state.city}
                            onChange={this.handleChange}
                        />
                        <AppliedFormGroup
                            groupProps={{controlId: 'state', labelText: 'State'}}
                            required
                            type="text"
                            value={this.state.state}
                            onChange={this.handleChange}
                        />
                        <AppliedFormGroup
                            groupProps={{controlId: 'zip', labelText: 'Zip Code'}}
                            required
                            type="text"
                            value={this.state.zip}
                            onChange={this.handleChange}
                        />
                    </Fragment>
                )}
            </div>
        );
    }

    renderPlayerForm = () => {
        return (
            <div className="step step-2">
                <h2>Create a Player</h2>
                <h3>Basic Info</h3>
                <AppliedFormGroup
                    groupProps={{controlId: 'firstName', labelText: 'First Name'}}
                    //validator={LoginValidator} //todo
                    required
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                />
                <AppliedFormGroup
                    groupProps={{controlId: 'lastName', labelText: 'Last Name'}}
                    //validator={LoginValidator} //todo
                    required
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                />
                <AppliedFormGroup
                    groupProps={{controlId: 'nickname', labelText: 'Nickname'}}
                    //validator={LoginValidator} //todo
                    required
                    type="text"
                    value={this.state.nickname}
                    onChange={this.handleChange}
                />
                <AppliedFormGroup
                    groupProps={{controlId: 'logo', labelText: `Logo`}}
                    //validator={LoginValidator} //todo
                    required
                    type="file"
                    onChange={this.handleFileChange}
                />
            </div>
        );
    }

    renderStep1 = () => {
        return (
            <div className="step step-1">
                <h2>What do you want to create?</h2>
                <Panel onClick={() => this.handleShowStep(2, 'league')}>
                    <Panel.Body>
                        <h3>League</h3>
                        <p>[some cool image]</p>
                        <p>[some cool text]</p>
                    </Panel.Body>
                </Panel>
                <Panel onClick={() => this.handleShowStep(2, 'venue')}>
                    <Panel.Body>
                        <h3>Venue</h3>
                        <p>[some cool image]</p>
                        <p>[some cool text]</p>
                    </Panel.Body>
                </Panel>
                <Panel onClick={() => this.handleShowStep(2, 'player')}>
                    <Panel.Body>
                        <h3>Player</h3>
                        <p>[some cool image]</p>
                        <p>[some cool text]</p>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }

    renderStep2 = (type) => {
        return (
            <div className="step step-2">
                <Form noValidate onSubmit={this.handleSubmit}>
                    {type === 'player' ? this.renderPlayerForm() : this.renderOrgForm(type)}
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create"
                        bsStyle="success"
                        loadingText="Creating"
                        active
                    />
                </Form>
            </div>
        );
    }

    render() {

        const {step, type} = this.state;
        const renderStep = this[`renderStep${step}`];

        return (
            <div className="Setup">
                <h1>Setup</h1>
                <Row>
                    <Col md={12}>
                        {renderStep(type)}
                    </Col>
                </Row>
            </div>
        );
    }
}
