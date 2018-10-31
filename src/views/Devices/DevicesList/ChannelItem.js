import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChannelWidget from '../../Widgets/ChannelWidget';
import { Col } from 'reactstrap';
import './ChannelItem.css';

class ChannelItem extends Component{

    render () {

        return (
            <Col sm="4" className="ChannelItem">
                <Link to={{ pathname: this.props.onClickRoute, state: { channel: this.props.channel } }}>
                    <ChannelWidget header={this.props.channel.label} mainText={this.props.channel.comment} events={this.props.channel.events} actions={this.props.channel.actions} icon={this.props.channel.logo} color={this.props.channel.color} />
                </Link>
            </Col>
        );
    }
}

export default ChannelItem;

/*
<Link to={{ pathname: this.props.onClickRoute, state: { channel: this.props.channel } }}>
                    <ChannelCompleteWidget header={this.props.channel.label} mainText={this.props.channel.comment} icon="fa fa-tv" color="primary" />
                </Link>
*/