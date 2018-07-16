import React, { Component } from 'react';
import RuleDroppable from './RuleDroppable';
import RuleCreateChannelItem from './RuleCreateChannelItem';
import RuleChooseSubchannelModal from './Modals/RuleChooseSubchannelModal';

import { DragDropContext } from 'react-beautiful-dnd';
import { createNewRule } from '../../../data/api/ApiConnect';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row
}
    from 'reactstrap';



class RuleCreate extends Component {

    constructor(props) {
        super(props);

        this.toogleDeviceModal = this.toogleDeviceModal.bind(this);
        this.createRule = this.createRule.bind(this);
        this.confirm = this.confirm.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.createRule = this.createRule.bind(this);

        this.state = {
            selectedEvents: [],
            selectedActions: [],
            selectedEventsSubchannels: [],
            selectedActionsSubchannels: [],
            selectedChannel: "",
            ruleName: "",
            ruleDescription: ""
        }
    }

    onChangeName(e){
        this.setState({
            ruleName: e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            ruleDescription: e.target.value
        })
    }
    confirm(selectedSubchannel, action) {
        if (action) {
            this.state.selectedActionsSubchannels.push(selectedSubchannel);
        } else {
            this.state.selectedEventsSubchannels.push(selectedSubchannel);
        }
    }

    createRule(){
        createNewRule(this.state.ruleName, this.state.ruleDescription, this.state.selectedActionsSubchannels, this.state.selectedEventsSubchannels);
    }

    toogleDeviceModal() {
        this.setState({
            chooseDeviceModal: !this.state.chooseDeviceModal
        })
    }

    onDragEnd = result => {
        const { source, destination, draggableId } = result;

        // remove item from container
        if (draggableId.includes("_copy")) {
            this.remove(draggableId);
            return;
        }

        // dropped outside the list
        if (!destination) {
            return;
        }

        // check if it has been already added
        for (var action of this.state.selectedActions) {
            if (action.id === draggableId + "_copy") {
                return;
            }
        }

        for (var event of this.state.selectedEvents) {
            if (event.id === draggableId + "_copy") {
                return;
            }
        }

        // if an event has been dropped to actions or vice versa
        if ((source.droppableId.includes("events_") && destination.droppableId === "droppableActions") || (source.droppableId.includes("actions_") && destination.droppableId === "droppableEvents")) {
            return;
        }

        // check if it has been added to actions or events
        if (source.droppableId.includes("actions_")) {
            const result = this.moveToActions(draggableId, source.droppableId, source, destination);

            this.setState({
                selectedActions: result.droppableActions
            });

            this.toogleDeviceModal()
        } else {
            const result = this.moveToEvents(draggableId, source.droppableId, source, destination);

            this.setState({
                selectedEvents: result.droppableEvents
            });

            this.toogleDeviceModal()
        }


    };

    remove(itemId) {
        // TODO
        /*
        // FIXME: could be improved
        // if it is an action, remove it
        for (var action of this.state.selectedActions) {
            if (action.id === itemId) {
                this.state.selectedActions.splice(this.state.selectedActions.indexOf(action), 1);
            }
        }

        // if it is an event, remove it
        for (var event of this.state.selectedEvents) {
            if (event.id === itemId) {
                this.state.selectedEvents.splice(this.state.selectedEvents.indexOf(event), 1);
            }
        }

        this.setState({
            selectedActions: this.state.selectedActions,
            selectedEvents: this.state.selectedEvents
        });*/
    }


    moveToActions(actionId, channelId, droppableSource, droppableDestination) {

        let selectedChannel = 0;
        let selectedAction = 0;

        // get channelId
        channelId = channelId.replace("actions_", "");

        // get selected channel
        for (var channel of this.props.channels) {
            if (channel.id === channelId) {
                selectedChannel = channel;
                // get selected actions
                for (var action of channel.actions) {
                    if (action.id === actionId) {
                        // create a copy of the selected action
                        selectedAction = Object.assign({}, action);
                        selectedChannel.selectedAction = action;
                        selectedAction.id = selectedAction.id + "_copy";
                    }
                }
            }
        }

        // create a copy of the selected actions and add the new action
        const destClone = Array.from(this.state.selectedActions);
        destClone.push(selectedAction);
        this.state.selectedActions.push(selectedAction);

        this.setState({
            selectedChannel: selectedChannel
        });
        const result = {};
        result[droppableSource.droppableId] = selectedChannel.actions;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    moveToEvents(eventId, channelId, droppableSource, droppableDestination) {

        let selectedChannel = 0;
        let selectedEvent = 0;

        // get channelId
        channelId = channelId.replace("events_", "");
        // get selected channel
        for (var channel of this.props.channels) {
            if (channel.id === channelId) {
                selectedChannel = channel;
                // get selected event
                for (var event of channel.events) {
                    if (event.id === eventId) {
                        // create a copy of the selected event
                        selectedEvent = Object.assign({}, event);
                        selectedChannel.selectedEvent = event;
                        selectedEvent.id = selectedEvent.id + "_copy";
                    }
                }
            }
        }
        const destClone = Array.from(this.state.selectedEvents);
        destClone.push(selectedEvent);
        this.state.selectedEvents.push(selectedEvent);
        this.setState({
            selectedChannel: selectedChannel
        });

        const result = {};
        result[droppableSource.droppableId] = selectedChannel.events;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    render() {

        let channelsList = this.props.channels.map((channel, index) => (
            <RuleCreateChannelItem key={index} channel={channel} />
        ));

        return (
            <div>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <Row>
                                    {/** Rule general info */}
                                    <Col sm="4">
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="label">Name</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="text" id="label" name="label" placeholder="Add a name for your rule" onChange={this.onChangeName} />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="label">Description</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="textarea" id="description" name="description" placeholder="Add a description for your rule" onChange={this.onChangeDescription} />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <DragDropContext onDragEnd={this.onDragEnd}>
                                        {/** Droppables */}
                                        <Col sm="4">
                                            <Card>
                                                <CardHeader>
                                                    <strong>If...</strong>
                                                </CardHeader>
                                                <CardBody>
                                                    <RuleDroppable droppableId="droppableEvents" selected={this.state.selectedEvents} />
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm="4">
                                            <Card>
                                                <CardHeader>
                                                    <strong>Then...</strong>
                                                </CardHeader>
                                                <CardBody>
                                                    <RuleDroppable droppableId="droppableActions" selected={this.state.selectedActions} />
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        {/** Draggables */}
                                        <Col xs="12" >
                                            <Row>
                                                {channelsList}
                                            </Row>
                                        </Col>

                                        {/** Modals **/}
                                        <RuleChooseSubchannelModal confirm={this.confirm} modal={this.state.chooseDeviceModal} toogleDeviceModal={this.toogleDeviceModal} channel={this.state.selectedChannel} />
                                    </DragDropContext>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button className="btn-pill" type="submit" size="sm" color="primary" onClick={this.createRule}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </CardFooter>
            </div>
        );
    }
}

export default RuleCreate;