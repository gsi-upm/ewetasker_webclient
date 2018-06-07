import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import RuleItem from './RuleItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getChannels } from '../../../data/api/ApiConnect';
import ChannelItem from '../../Channels/Channels/ChannelItem';
import { Channel } from '../../../model/Channel';

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
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: `100%`
});

class Rules extends Component {


    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination, draggableId } = result;

        console.log(result);
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            /*const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );*/
            const result = this.moveToActions(draggableId, source.droppableId, destination.droppableId, source, destination);

            this.setState({
                selectedActions: result.droppable2
            });
        }
    };

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.moveToActions = this.moveToActions.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = {
            activeTab: '1',
            items: [],
            selected: [],
            selectedEvents : [],
            selectedActions : []
        };
    }

    moveToActions(actionId, channelId, destination, droppableSource, droppableDestination){
        let selectedChannel = 0;
        let selectedAction = 0;
        for(var channel of this.state.channels){
            if(channel.id === channelId){
                selectedChannel = channel;
                for(var action of channel.actions){
                    if(action.id === actionId){
                        selectedAction = action;
                    }
                }
            }
        }
        const destClone = Array.from(this.state.selectedActions);
        destClone.push(selectedAction);


        const result = {};
        result[droppableSource.droppableId] = selectedChannel.actions;
        result[droppableDestination.droppableId] = destClone;
    
        return result;
    };

    componentWillMount(){

        var getChannelsCallback = function(channels){
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

      
    render (){

        if (typeof this.state.channels === "undefined"){
            return <div className="animated fadeIn"></div>
          }

          
          
          let channelsList = this.state.channels.map((channel, index) => (
            
            <Col xs="12" sm="6" lg="4" key={index} index={index}>
                <Card>
                    <CardBody>
                        <h4 className="text-muted text-uppercase font-weight-bold font-sm" >{channel.label}</h4>
                        <Droppable droppableId={channel.id} >
                                        {(provided, snapshot) => (
                                                <ListGroup>
                                                <div
                                                    ref={provided.innerRef}
                                                    
                                                    >
                                                    {channel.actions.map((action, index) => (
                                                        <Draggable
                                                            key={action.id}
                                                            draggableId={action.id}
                                                            index={index}>
                                                            {(provided, snapshot) => (
                                                                <ListGroupItem>
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    >
                                                                    <i className='bg-primary p-2 fa fa-tv font-2xl mr-3 float-left'></i>
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
                                            )}
                                        </Droppable>

                    </CardBody>
                </Card>
            </Col>
          )
          );

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
                            <Row>
                            <Col xs="12">

                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <Row>
                                <Col sm="6">  
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="label">Name</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <Input type="text" id="label" name="label" placeholder="Add a name for your rule" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                    <Label htmlFor="label">Description</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                    <Input type="text" id="description" name="description" placeholder="Add a description for your rule" />
                                    </Col>
                                </FormGroup>
                                </Col>
                                <DragDropContext onDragEnd={this.onDragEnd}>

                                <Col sm="3" xl="3">
                                    <Card>
                                    <CardHeader>
                                        <i className="fa fa-align-justify"></i><strong>Event</strong>
                                    </CardHeader>
                                    <CardBody>
                                    <Droppable droppableId="droppable" >
                                        {(provided, snapshot) => (
                                                <ListGroup>
                                                <div
                                                    ref={provided.innerRef}
                                                    style={getListStyle(snapshot.isDraggingOver)}
                                                    >
                                                    {this.state.items.map((item, index) => (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}>
                                                            {(provided, snapshot) => (
                                                                <ListGroupItem>
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    >
                                                                    {item.content}
                                                                </div>
                                                                </ListGroupItem>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                                </ListGroup>
                                            )}
                                        </Droppable>
                                    </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="3" xl="3">
                                    <Card>
                                    <CardHeader>
                                        <i className="fa fa-align-justify"></i><strong>Action</strong>
                                    </CardHeader>
                                    <CardBody>
                                    <Droppable droppableId="droppable2">
                                        {(provided, snapshot) => (
                                            <ListGroup>
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {console.log(this.state.selectedActions)}
                                                {this.state.selectedActions.map((action, index) => (
                                                    <ListGroupItem>
                                                    <Draggable
                                                            key={action.id}
                                                            draggableId={action.id}
                                                            index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    >
                                                                    <i className='bg-primary p-2 fa fa-tv font-2xl mr-3 float-left'></i>
                                                                    <div className="text-muted font-weight-bold font-xs">{action.label}</div>
                                                                    <div className="channelDescription text-muted font-xs">{action.comment}</div>
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
                                    </CardBody>
                                    </Card>
                                </Col>
                                <Col xs="12" >
                                    {channelsList} 
                                </Col>
                                </DragDropContext>
                                    
                                </Row>
                            </Form>
                            </Col>
                        </Row>
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
