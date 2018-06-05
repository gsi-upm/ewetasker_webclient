import React, { Component } from 'react';
import { Col } from 'reactstrap';
import ChannelItem from './ChannelItem';
import { getChannels } from '../../../data/api/ApiConnect';

class Channels extends Component {

    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    componentWillMount(){

        var getChannelsCallback = function(channels){
          this.setState({
            channels: channels
          });
        };
        getChannelsCallback = getChannelsCallback.bind(this);
        getChannels().then(getChannelsCallback);
        
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }

    render(){
        if (typeof this.state.channels === "undefined"){
          return <div className="animated fadeIn"></div>
        }
        let channelsList = this.state.channels.map((channel, index) => 
            <ChannelItem onClickRoute='/channels/edit' key={index} channel={channel} />
        );
        return (
            <div className="animated fadeIn">
                <Col xs="12" className="mb-4">
                   {channelsList} 
                </Col>
            </div>
        )
    }
}

export default Channels;