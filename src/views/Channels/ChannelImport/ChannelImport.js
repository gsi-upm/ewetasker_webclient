import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ChannelParameterItem from './ChannelParameterItem';

import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Row,
  } from 'reactstrap';

class ChannelImport extends Component{

    constructor(props){
        super(props);
        this.state = {};
        this.cancel = this.cancel.bind(this);
    }
    cancel(){
        this.setState({
            cancel: true
        })
    }
    render () {

        // Check if a channel has been passed, and redirect to channels if hasn't
        if (typeof this.props.location.state === 'undefined' || this.state.cancel){
            return <Redirect push to="/channels" />;
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
                            <Label htmlFor="name-input">Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="name-input" name="name-input" placeholder="Add a name for your channel" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="description-input">Description</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="email" id="description-input" name="description-input" placeholder="Add a description for your channel"/>
                            </Col>
                        </FormGroup>
                        {parametersList}
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
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