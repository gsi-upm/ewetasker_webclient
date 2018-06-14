import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import RuleItem from './RuleItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getChannels } from '../../../data/api/ApiConnect';
import { Channel } from '../../../model/Channel';
import './Rules.css';
import RuleCreate from '../RuleCreate/RuleCreate';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [removed] = [sourceClone[droppableSource.index]];

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};



const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    width: '100%',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'white',
    padding: grid,
    width: `100%`
});

class Rules extends Component {


    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.moveToActions = this.moveToActions.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.remove = this.remove.bind(this);
        this.moveToEvents = this.moveToEvents.bind(this);

        this.state = {
            activeTab: '1',
            items: [],
            selected: [],
            selectedEvents: [],
            selectedActions: []
        };
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppableEvents: 'items',
        droppableActions: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination, draggableId } = result;

        if (draggableId.includes("_copy")) {
            this.remove(draggableId);
            return;
        }

        // dropped outside the list
        if (!destination) {
            return;
        }

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

        if ((source.droppableId.includes("events_") && destination.droppableId === "droppableActions") || (source.droppableId.includes("actions_") && destination.droppableId === "droppableEvents")) {
            return;
        }
        if (source.droppableId === destination.droppableId) {


        } else {

            if (source.droppableId.includes("actions_")) {
                const result = this.moveToActions(draggableId, source.droppableId, destination.droppableId, source, destination);

                this.setState({
                    selectedActions: result.droppableActions
                });
            } else {
                const result = this.moveToEvents(draggableId, source.droppableId, destination.droppableId, source, destination);

                this.setState({
                    selectedEvents: result.droppableEvents
                });
            }

        }
    };



    remove(actionId) {


        for (var action of this.state.selectedActions) {
            if (action.id === actionId) {
                this.state.selectedActions.splice(this.state.selectedActions.indexOf(action), 1);
            }
        }

        for (var event of this.state.selectedEvents) {
            if (event.id === actionId) {
                this.state.selectedEvents.splice(this.state.selectedEvents.indexOf(action), 1);
            }
        }

        this.setState({
            selectedActions: this.state.selectedActions,
            selectedEvents: this.state.selectedEvents
        });
    }


    moveToActions(actionId, channelId, destination, droppableSource, droppableDestination) {

        let selectedChannel = 0;
        let selectedAction = 0;
        channelId = channelId.replace("actions_", "");
        for (var channel of this.state.channels) {
            if (channel.id === channelId) {
                selectedChannel = channel;
                for (var action of channel.actions) {
                    if (action.id === actionId) {
                        selectedAction = Object.assign({}, action);
                        selectedAction.id = selectedAction.id + "_copy";
                    }
                }
            }
        }
        const destClone = Array.from(this.state.selectedActions);
        destClone.push(selectedAction);
        this.state.selectedActions.push(selectedAction);

        const result = {};
        result[droppableSource.droppableId] = selectedChannel.actions;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    moveToEvents(eventId, channelId, destination, droppableSource, droppableDestination) {

        let selectedChannel = 0;
        let selectedEvent = 0;
        channelId = channelId.replace("events_", "");
        for (var channel of this.state.channels) {
            if (channel.id === channelId) {
                selectedChannel = channel;
                for (var event of channel.events) {
                    if (event.id === eventId) {
                        selectedEvent = Object.assign({}, event);
                        selectedEvent.id = selectedEvent.id + "_copy";
                    }
                }
            }
        }
        const destClone = Array.from(this.state.selectedEvents);
        destClone.push(selectedEvent);
        this.state.selectedEvents.push(selectedEvent);

        const result = {};
        result[droppableSource.droppableId] = selectedChannel.events;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    componentWillMount() {

        var getChannelsCallback = function (channels) {
            this.setState({
                channels: channels
            });
        };
        getChannelsCallback = getChannelsCallback.bind(this);
        getChannels().then(getChannelsCallback);

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }


    render() {

        if (typeof this.state.channels === "undefined") {
            return <div className="animated fadeIn"></div>
        }


        return (
            <div className="animated fadeIn">
                <Col xs="12" className="mb-4">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >
                                List
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                New
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <RuleItem />
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col xs="12">
                                    <Card>
                                        <CardHeader>
                                            <strong>Create rule</strong>
                                        </CardHeader>
                                        <CardBody>
                                            <RuleCreate channels={this.state.channels}/>
                                        </CardBody>
                                    </Card>
                                </Col>

                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </div>
        );
    }
}

export default Rules;
