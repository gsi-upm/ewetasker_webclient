import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {ListGroup, ListGroupItem} from 'reactstrap';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'white',
    padding: 8,
    width: `100%`
});

class RuleDroppable extends Component {

    constructor(props){
        super(props);

    }

    render() {
        return (
            <Droppable droppableId={this.props.droppableId}>
                {(provided, snapshot) => (
                    <ListGroup>
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.props.selected.map((item, index) => (
                                <ListGroupItem key={item.id}>
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <i className={"bg-primary p-2 font-2xl mr-3 float-left " + item.logo}></i>
                                                <div className="text-muted font-weight-bold font-xs">{item.label}</div>
                                                <div className="channelDescription text-muted font-xs">{item.comment}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                </ListGroupItem>
                            ))}
                            {provided.placeholder}
                        </div>
                    </ListGroup>
                )}
            </Droppable>
        )
    }
}

export default RuleDroppable;
