import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ServiceParameterItem from './ServiceParameterItem';
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
import { deleteCustomChannel } from '../../../data/api/ApiConnect';

class ServicesEdit extends Component {

    constructor(props){
        super(props);
        this.state = {
            showAlert: false
        };
        this.delete = this.delete.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    submit(){

    }

    delete(){
        
        var deleteServiceCallback = function(result){
            this.setState({
                success: result,
                showAlert: true
            })
        }
        deleteServiceCallback = deleteServiceCallback.bind(this);
        const {service} = this.props.location.state
        console.log(service.id)
        deleteCustomChannel(service.id).then(deleteServiceCallback);
    }

    cancel(){
        this.setState({
            cancel: true
        })
    }
    
    render(){
        if (sessionStorage.getItem('jwtToken')===null) {
            return <Redirect push to="/login" />;
        }
        // Check if a services has been passed, and redirect to services if hasn't
        if (typeof this.props.location.state === 'undefined' || this.state.cancel){
            return <Redirect push to="/services" />;
        }

        // Check if a channel has been succesfully imported
        if (this.state.showAlert && this.state.success){
            return <Redirect push to={{ pathname: '/services', state: { showAlert: false } }} />;
        }

        const {service} = this.props.location.state
        let parametersList = service.parameters.map((parameter, index) =>
            <ServiceParameterItem parameter={parameter} key={index} />
        );

        return (
            <div className="animated fadeIn">
                <Row>
                <Col xs="12">
                    <Card>
                    <CardHeader>
                        <strong>Edit service</strong> {service.label}
                    </CardHeader>
                    <CardBody>
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                            <Label>Base channel</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <p className="form-control-static">{service.type}</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="label">Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="label" name="label" placeholder="Add a name for your channel" onChange={this.handleChangeChannel} value={service.label}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="comment">Description</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="comment" name="comment" placeholder="Add a description for your channel" onChange={this.handleChangeChannel} value={service.comment} />
                            </Col>
                        </FormGroup>
                        {parametersList}
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button className="btn-pill" type="reset" size="sm" color="danger" onClick={this.delete}><i className="fa fa-trash"></i> Delete</Button>{' '}
                        <Button className="btn-pill" type="reset" size="sm" color="secondary" onClick={this.cancel}><i className="fa fa-arrow-left"></i> Back</Button>
                    </CardFooter>
                    </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ServicesEdit;