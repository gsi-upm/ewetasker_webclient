import React, { Component } from 'react';
import { Redirect } from 'react-router';

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

class ChannelEdit extends Component{

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

        if (sessionStorage.getItem('jwtToken')===null) {
            return <Redirect push to="/login" />;
        }

        // Check if a channel has been passed, and redirect to channels if hasn't
        if (typeof this.props.location.state === 'undefined' || this.state.cancel){
            return <Redirect push to="/channels" />;
        }

        const {channel} = this.props.location.state
        
        return (
            <div className="animated fadeIn">
                <Row>
                <Col xs="12">
                    <Card>
                    <CardHeader>
                        <strong>Edit channel</strong> {channel.label}
                    </CardHeader>
                    <CardBody>
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="name-input">Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="name-input" name="name-input" value={channel.label} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="description-input">Description</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="description-input" name="description-input" value={channel.comment}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="logo-input">Logo</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="logo-input" name="logo-input" value={channel.logo}/>
                            </Col>
                        </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button className="btn-pill" type="submit" size="sm" color="primary">Save</Button>
                        <Button className="btn-pill" type="reset" size="sm" color="danger" onClick={this.cancel}>Cancel</Button>
                    </CardFooter>
                    </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChannelEdit;