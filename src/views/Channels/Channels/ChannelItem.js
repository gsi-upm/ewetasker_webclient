import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChannelWidget from '../../Widgets/ChannelWidget';
import { Col } from 'reactstrap';
import './ChannelItem.css';

class ChannelItem extends Component{

    onClick(){
        console.log("click");
    }
    render () {
        return (
            <Col xs="12" sm="6" lg="4" onClick={this.onClick} className="ChannelItem">
                <Link to={{ pathname: '/channels/import', state: { channel: this.props.channel } }}>
                    <ChannelWidget header={this.props.channel.label} mainText={this.props.channel.comment} icon="fa fa-tv" color="primary" />
                </Link>

            </Col>
        );
    }
}

export default ChannelItem;