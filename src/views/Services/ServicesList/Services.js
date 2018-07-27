import React, { Component } from 'react';
import ChannelItem from './ChannelItem';
import ServiceItem from './ServiceItem';
import { getCategoryChannels, getCustomCategoryChannels } from '../../../data/api/ApiConnect';
import { Col, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import ChannelImportedAlert from '../../Alerts/ChannelImportedAlert';
import { Redirect } from 'react-router';

class Services extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
        
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
    }

    componentWillMount(){

        var getChannelsCallback = function(channels){
          this.setState({
            channels: channels
          });
        };
        getChannelsCallback = getChannelsCallback.bind(this);
        // FIXME: Hardcoded route
        getCategoryChannels("http://gsi.dit.upm.es/ontologies/ewe-service/ns/Service").then(getChannelsCallback);
        
        var getServicesCallback = function(services){
            this.setState({
              services: services
            });
        };
        getServicesCallback = getServicesCallback.bind(this);
        getCustomCategoryChannels("http://gsi.dit.upm.es/ontologies/ewe-service/ns/Service").then(getServicesCallback);

    }   

    render (){
        if (sessionStorage.getItem('jwtToken')===null) {
            return <Redirect push to="/login" />;
        }
        if (typeof this.state.channels === "undefined" || typeof this.state.services === "undefined"){
            return <div className="animated fadeIn"></div>
        }
        let channelsList = this.state.channels.map((channel, index) => 
            <ChannelItem onClickRoute='/services/import' key={index} channel={channel} />
        );

        let servicesList = this.state.services.map((service, index) => 
            <ServiceItem onClickRoute='/services/edit' key={index} service={service} />
        );

        return (
            <div className="animated fadeIn">
                <ChannelImportedAlert visible={ typeof this.props.location.state === "undefined" ? false : this.props.location.state.showAlert }/>
                <Col xs="12" className="mb-4">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            >
                            List
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            >
                            Create
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                            {servicesList} 
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
        );
    }
}

export default Services;