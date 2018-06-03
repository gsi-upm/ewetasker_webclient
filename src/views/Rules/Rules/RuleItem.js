import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RuleWidget from '../../Widgets/RuleWidget';
import { Col } from 'reactstrap';
import './RuleItem.css';

class RuleItem extends Component{

    onClick(){
        console.log("click");
    }

    render () {
        return (
            <Col xs="12" sm="6" onClick={this.onClick} className="RuleItem">
                <Link to={{ pathname: '/channels/import', state: { channel: "" } }}>
                    <RuleWidget header="Rule 1" mainText="Sample rule" eventIcon="fa fa-tv" actionIcon="fa fa-bluetooth" color="primary" />
                </Link>
            </Col>
        );
    }
}

export default RuleItem;