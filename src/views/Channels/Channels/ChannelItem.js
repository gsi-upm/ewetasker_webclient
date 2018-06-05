import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChannelWidget from '../../Widgets/ChannelWidget';
import { Col } from 'reactstrap';
import './ChannelItem.css';

class ChannelItem extends Component{

    render () {
        return (
            <Col xs="12" sm="6" lg="4"className="ChannelItem">
                <Link to={{ pathname: this.props.onClickRoute, state: { channel: this.props.channel } }}>
                    <ChannelWidget header={this.props.channel.label} mainText={this.props.channel.comment} icon="fa fa-tv" color="primary" />
                </Link>

            </Col>
        );
    }
}

export default ChannelItem;