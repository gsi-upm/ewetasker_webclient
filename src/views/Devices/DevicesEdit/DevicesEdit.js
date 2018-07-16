import React, { Component } from 'react';
import { Redirect } from 'react-router';
import DeviceParameterItem from './DeviceParameterItem';
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

class DevicesEdit extends Component {

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

        var deleteDeviceCallback = function(result){
            this.setState({
                success: result,
                showAlert: true
            })
        }
        deleteDeviceCallback = deleteDeviceCallback.bind(this);
        const {device} = this.props.location.state
        deleteCustomChannel(device.id).then(deleteDeviceCallback);
    }

    cancel(){
        this.setState({
            cancel: true
        })
    }
    
    render(){

        // Check if a devices has been passed, and redirect to devices if hasn't
        if (typeof this.props.location.state === 'undefined' || this.state.cancel){
            return <Redirect push to="/devices" />;
        }

        // Check if a channel has been succesfully imported
        if (this.state.showAlert && this.state.success){
            return <Redirect push to={{ pathname: '/devices', state: { showAlert: false } }} />;
        }

        const {device} = this.props.location.state
        let parametersList = device.parameters.map((parameter, index) =>
            <DeviceParameterItem parameter={parameter} key={index} />
        );

        return (
            <div className="animated fadeIn">
                <Row>
                <Col xs="12">
                    <Card>
                    <CardHeader>
                        <strong>Edit device</strong> {device.label}
                    </CardHeader>
                    <CardBody>
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <FormGroup row>
                            <Col md="3">
                            <Label>Base channel</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <p className="form-control-static">{device.type}</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="label">Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="label" name="label" placeholder="Add a name for your channel" onChange={this.handleChangeChannel} value={device.label}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                            <Label htmlFor="comment">Description</Label>
                            </Col>
                            <Col xs="12" md="9">
                            <Input type="text" id="comment" name="comment" placeholder="Add a description for your channel" onChange={this.handleChangeChannel} value={device.comment} />
                            </Col>
                        </FormGroup>
                        {parametersList}
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button className="btn-pill" type="submit" size="sm" color="primary" onClick={this.submit}><i className="fa fa-dot-circle-o"></i> Submit</Button>{' '}
                        <Button className="btn-pill" type="reset" size="sm" color="danger" onClick={this.delete}><i className="fa fa-trash"></i> Delete</Button>{' '}
                        <Button className="btn-pill" type="reset" size="sm" color="secondary" onClick={this.cancel}><i className="fa fa-ban"></i> Cancel</Button>
                    </CardFooter>
                    </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DevicesEdit;