import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, 
    CardBody, 
    ListGroup, 
    ListGroupItem, 
    Col } 
    from 'reactstrap';

class RuleCreateChannelItem extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Col xs="12" sm="6" lg="4">
                <Card>
                    <CardBody>
                        <h4 className="text-muted text-uppercase font-weight-bold font-sm" >{this.props.channel.label}</h4>
                        <Droppable droppableId={"actions_" + this.props.channel.id} >
                            {(provided) => (
                                <div className="channelSection">
                                    <h4 className="text-muted text-uppercase font-xs">Actions</h4>
                                    <ListGroup>
                                        <div
                                            ref={provided.innerRef}
                                        >
                                            {this.props.channel.actions.map((action, index) => (
                                                <Draggable
                                                    key={action.id}
                                                    draggableId={action.id}
                                                    index={index}>
                                                    {(provided) => (
                                                        <ListGroupItem>
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <i className={"bg-primary p-2 font-2xl mr-3 float-left " + action.logo}></i>
                                                                <div className="text-muted font-weight-bold font-xs">{action.label}</div>
                                                                <div className="channelDescription text-muted font-xs">{action.comment}</div>
                                                            </div>
                                                        </ListGroupItem>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </ListGroup>
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId={"events_" + this.props.channel.id} >
                            {(provided) => (
                                <div className="channelSection">
                                    <h4 className="text-muted text-uppercase font-xs">Events</h4>
                                    <ListGroup>
                                        <div
                                            ref={provided.innerRef}
                                        >
                                            {this.props.channel.events.map((event, index) => (
                                                <Draggable
                                                    key={event.id}
                                                    draggableId={event.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <ListGroupItem>
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <i className={"bg-primary p-2 font-2xl mr-3 float-left " + event.logo}></i>
                                                                <div className="text-muted font-weight-bold font-xs">{event.label}</div>
                                                                <div className="channelDescription text-muted font-xs">{event.comment}</div>
                                                            </div>
                                                        </ListGroupItem>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </ListGroup>
                                </div>
                            )}
                        </Droppable>

                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default RuleCreateChannelItem;