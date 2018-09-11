import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import RuleItem from './RuleItem';
import { getChannels } from '../../../data/api/ApiConnect';
import './Rules.css';
import RuleCreate from '../RuleCreate/RuleCreate';
import { Redirect } from 'react-router';

class Rules extends Component {


    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    
    componentWillMount() {

        var getChannelsCallback = function (channels) {
            this.setState({
                channels: channels
            });
        };
        getChannelsCallback = getChannelsCallback.bind(this);
        getChannels().then(getChannelsCallback);
/*
        var getRulesCallback = function(rules){
            this.setState({
              rules: rules
            });
        };
        getRulesCallback = getRulesCallback.bind(this);
        getCustomRules("http://gsi.dit.upm.es/ontologies/ewe-device/ns/Device").then(getDevicesCallback);
*/
    }




    render() {
        if (sessionStorage.getItem('jwtToken')===null) {
            return <Redirect push to="/login" />;
        }

        if (typeof this.state.channels === "undefined") {
            return <div className="animated fadeIn"></div>
        }
        /*
        let rulesList = this.state.rules.map((rule, index) => 
        <RuleItem key={index} rule={rule} />
        );
        */
        return (
            <div className="animated fadeIn">
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
                                New
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                { // {rulesList}
                                <RuleItem />
                                }
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col xs="12">
                                    <Card>
                                        <CardHeader>
                                            <strong>Create rule</strong>
                                        </CardHeader>
                                        <RuleCreate channels={this.state.channels}/>
                                        
                                    </Card>
                                </Col>

                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </div>
        );
    }
}

export default Rules;
