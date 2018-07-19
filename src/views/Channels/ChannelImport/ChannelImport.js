import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ChannelParameterItem from './ChannelParameterItem';
import { importChannel } from '../../../data/api/ApiConnect';

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
  } from 'reactstrap';

class ChannelImport extends Component{

    constructor(props){
        super(props);
        this.state = {
            showAlert: false
        };
        this.cancel = this.cancel.bind(this);
        this.handleChangeChannel = this.handleChangeChannel.bind(this);
        this.import = this.import.bind(this);
    }

    import(){
        var importChannelCallback = function(result){
            this.setState({
                success: result,
                showAlert: true
            })
        };
        importChannelCallback = importChannelCallback.bind(this);
        const {channel} = this.props.location.state;
        importChannel(channel).then(importChannelCallback);
    }

    cancel(){
        this.setState({
            cancel: true
        })
    }

    handleChangeChannel(event){
        const {channel} = this.props.location.state;
        channel[event.target.name] = event.target.value;
    }

    render () {

        // Check if a channel has been passed, and redirect to channels if hasn't
        if (typeof this.props.location.state === 'undefined' || this.state.cancel){
            return <Redirect push to={this.props.location.pathname.replace('/import','')} />;
        }

        // Check if a channel has been succesfully imported
        if (this.state.showAlert && this.state.success){
            return <Redirect push to={{ pathname: this.props.location.pathname.replace('/import',''), state: { showAlert: true } }} />;
        }
        const {channel} = this.props.location.state

        let parametersList = channel.parameters.map((parameter, index) =>
            <ChannelParameterItem parameter={parameter} key={index} />
        );
        return (
            <div className="animated fadeIn">
                <Row>
                <Col xs="12">
                    <Card>
                    <CardHeader>
                        <strong>Import channel</strong> {channel.label}
                    </CardHeader>
                    <CardBody>
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                            <Label>Base channel</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <p className="form-control-static">{channel.label}</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="label">Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="label" name="label" placeholder="Add a name for your channel" onChange={this.handleChangeChannel}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="comment">Description</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="comment" name="comment" placeholder="Add a description for your channel" onChange={this.handleChangeChannel} />
                            </Col>
                        </FormGroup>
                        {parametersList}
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary" onClick={this.import}><i className="fa fa-dot-circle-o"></i> Import</Button>{' '}
                        <Button type="reset" size="sm" color="danger" onClick={this.cancel}><i className="fa fa-ban"></i> Cancel</Button>
                    </CardFooter>
                    </Card>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default ChannelImport;