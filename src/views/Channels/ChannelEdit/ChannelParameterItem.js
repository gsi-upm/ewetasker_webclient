import React, { Component } from 'react';

import { Col, FormGroup, Label, Input } from 'reactstrap';

class ChannelParameterItem extends Component{

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e){
        this.props.onChange();
    }
    render () {
        console.log("buenaaas");
        return (
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor="description-input">{this.props.parameter.label}</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input type="text" parameter={this.props.parameter} onChange={this.onChange} id="description-input" name="description-input" placeholder={this.props.parameter.comment}/>
                </Col>
            </FormGroup>
        );
    }
}

export default ChannelParameterItem;