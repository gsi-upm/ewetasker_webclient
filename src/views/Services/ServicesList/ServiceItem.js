import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChannelWidget from '../../Widgets/ChannelWidget';
import { Col } from 'reactstrap';
import './ServiceItem.css';

class ServiceItem extends Component{

    render () {
        return (
            <Col xs="12" sm="6" lg="4"className="ServiceItem">
                <Link to={{ pathname: this.props.onClickRoute, state: { service: this.props.service } }}>
                    <ChannelWidget header={this.props.service.label} mainText={this.props.service.comment} icon={this.props.service.logo} color="primary" />
                </Link>
            </Col>
        );
    }
}

export default ServiceItem;