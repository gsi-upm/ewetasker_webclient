import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RuleWidget from '../../Widgets/RuleWidget';
import { Col } from 'reactstrap';
import './RuleItem.css';

class RuleItem extends Component{


    render () {
        return (
            <Col xs="12" sm="6"  className="RuleItem">
                    <RuleWidget rule_id={this.props.rule.id[0]} header={this.props.rule.label} mainText={this.props.rule.comment} events={this.props.rule.eventsChannels} actions={this.props.rule.actionsChannels} handler={this.props.handler} />         
            </Col>
            
        );
    }
}

export default RuleItem;