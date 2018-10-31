import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChannelCompleteWidget from '../../Widgets/ChannelCompleteWidget';
import { Col } from 'reactstrap';
import './ChannelItem.css';

class ChannelItem extends Component{

    render () {
        return (
            <Col sm="4" className="ChannelItem">
                <ChannelCompleteWidget onClickRoute='/channels/edit' channel={this.props.channel} header={this.props.channel.label} mainText={this.props.channel.comment} events={this.props.channel.events} actions={this.props.channel.actions} icon={this.props.channel.logo} color={this.props.channel.color} />
            </Col>
        );
    }
}

export default ChannelItem;

