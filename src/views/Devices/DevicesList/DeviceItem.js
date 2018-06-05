import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChannelWidget from '../../Widgets/ChannelWidget';
import { Col } from 'reactstrap';
import './DeviceItem.css';

class DeviceItem extends Component{

    render () {
        return (
            <Col xs="12" sm="6" lg="4"className="DeviceItem">
                <Link to={{ pathname: this.props.onClickRoute, state: { device: this.props.device } }}>
                    <ChannelWidget header={this.props.device.label} mainText={this.props.device.comment} icon="fa fa-tv" color="primary" />
                </Link>

            </Col>
        );
    }
}

export default DeviceItem;