import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getCustomSubChannels } from '../../../../data/api/ApiConnect';

class RuleChooseSubchannelModal extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.loadSubchannels = this.loadSubchannels.bind(this);
        this.confirm = this.confirm.bind(this);
        this.onChangeSubchannel = this.onChangeSubchannel.bind(this);
        this.state = {
            channel: "",
            channels: [],
            selectedSubchannel: ""
        }
    }

    componentWillReceiveProps(){
        this.setState({
            channel: Object.assign({}, this.props.channel)
        })
    }

    loadSubchannels() {

        var getCustomSubChannelsCallback = function (channels) {
            this.setState({
                channels: channels,
                selectedSubchannel: channels[0]
            });
        };
        getCustomSubChannelsCallback = getCustomSubChannelsCallback.bind(this);
        getCustomSubChannels(this.state.channel.id).then(getCustomSubChannelsCallback);

    }

    toggle() {
        this.props.toogleDeviceModal();
    }

    onChangeDynamicParameter(param, e){
        param.value = e.target.value;
    }

    onChangeSubchannel(e){
        console.log(e);
    }

    confirm(){
        if(typeof (this.state.channel.selectedAction) === 'undefined' || this.state.channel.selectedAction === ""){
            if(typeof (this.state.channel.selectedEvent) === 'undefined' || this.state.channel.selectedEvent === ""){
            }else{
                this.props.confirm(this.state.selectedSubchannel, true);
                // Clean variable
                this.state.selectedSubchannel = undefined;
            }
        }else{
            this.props.confirm(this.state.selectedSubchannel, false);
            // Clean variable
            this.state.selectedSubchannel = undefined;
        }
        this.props.toogleDeviceModal();
    }

    render() {
        var itemName = "";
        if(typeof (this.state.channel.selectedAction) === 'undefined' || this.state.channel.selectedAction === ""){
            if(typeof (this.state.channel.selectedEvent) === 'undefined' || this.state.channel.selectedEvent === ""){
            }else{
                // Check if a subchannel has been selected, for assigning the selected event
                if(this.state.selectedSubchannel !== "" && typeof(this.state.selectedSubchannel) !== "undefined"){
                    // FIXME: should not mutate state directly. Use setState()
                    this.state.selectedSubchannel.selectedEvent = this.state.channel.selectedEvent;
                }
                itemName = this.state.channel.selectedEvent.label;
            }
        }else{
            // Check if a subchannel has been selected, for assigning the selected action
            if(this.state.selectedSubchannel !== "" && typeof(this.state.selectedSubchannel) !== "undefined"){
                // FIXME: should not mutate state directly. Use setState()
                this.state.selectedSubchannel.selectedAction = this.state.channel.selectedAction;
            }
            itemName = this.state.channel.selectedAction.label;
        }

        var subchannels = <option></option>;
        if (typeof (this.state.channels) !== 'undefined') {
            subchannels = this.state.channels.map((channel, index) => {
                return <option key={index} value={channel.id}>{channel.label}</option>
            });
        }

        var staticParams = <FormGroup row></FormGroup>;
        if (typeof (this.state.selectedSubchannel) !== 'undefined' && this.state.selectedSubchannel !== "") {
            staticParams = this.state.selectedSubchannel.parameters.map((param, index) => {
                return (
                    <FormGroup key={index} row>
                        <Col md="4">
                            <Label>{param.label}</Label>
                        </Col>
                        <Col xs="12" md="8">
                            <p className="form-control-static">{param.value}</p>
                        </Col>
                    </FormGroup>
                );
            });
        }

        var dynamicParams = <FormGroup row></FormGroup>;
        if (typeof (this.state.channel.selectedAction) !== 'undefined' && typeof (this.state.channel.selectedAction.outputParameters) !== 'undefined' && this.state.channel.selectedAction !== "") {
            dynamicParams = this.state.channel.selectedAction.outputParameters.map((param, index) => {
                return (
                    <FormGroup key={index} row>
                        <Col md="4">
                            <Label>{param.label}</Label>
                        </Col>
                        <Col xs="12" md="8">
                            <Input type="text" id="text-input" name="text-input" placeholder="Text" onChange={(e) => this.onChangeDynamicParameter(param, e)} />
                        </Col>
                    </FormGroup>
                );
            });

        }

        if (typeof (this.state.channel.selectedEvent) !== 'undefined' && typeof (this.state.channel.selectedEvent.outputParameters) !== 'undefined' && this.state.channel.selectedEvent !== "") {
            dynamicParams = this.state.channel.selectedEvent.outputParameters.map((param, index) => {
                return (
                    <FormGroup key={index} row>
                        <Col md="4">
                            <Label>{param.label}</Label>
                        </Col>
                        <Col xs="12" md="8">
                            <Input type="text" id="text-input" name="text-input" placeholder="Text" onChange={(e) => this.onChangeDynamicParameter(param, e)} />
                        </Col>
                    </FormGroup>
                );
            });

        }

        return (
            <Modal onOpened={this.loadSubchannels} isOpen={this.props.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{itemName}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="ccmonth">Choose a device/service</Label>
                            <Input type="select" name="ccmonth" id="ccmonth" onChange={this.onChangeSubchannel}>
                                {subchannels}
                            </Input>
                        </FormGroup>
                        {staticParams}
                        {dynamicParams}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.confirm}>Confirm</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default RuleChooseSubchannelModal;