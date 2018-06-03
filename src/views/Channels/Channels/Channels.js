import React, { Component } from 'react';
import { Col, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
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
        let channels = getChannels().then(getChannelsCallback);
        
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
            <ChannelItem key={index} channel={channel} />
        );
        return (
            <div className="animated fadeIn">
                <Col xs="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Default
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Own
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                   {channelsList} 
                </Row>
              </TabPane>
              <TabPane tabId="2">
              <Row>
                   {channelsList} 
                </Row>
              </TabPane>
            </TabContent>
          </Col>
            </div>
        )
    }
}

export default Channels;