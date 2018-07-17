import React, { Component } from 'react';

import { Col, FormGroup, Label, Input } from 'reactstrap';

class ServiceParameterItem extends Component{

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    // FIXME: Change a prop from inside a component is a bad practice
    onChange(e){
        this.props.parameter.value = e.target.value;
    }

    render () {
        return (
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="description-input">{this.props.parameter.label}</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" parameter={this.props.parameter} onChange={this.onChange} id="description-input" name="description-input" placeholder={this.props.parameter.comment} value={this.props.parameter.value}/>
                </Col>
            </FormGroup>
        );
    }
}

export default ServiceParameterItem;