import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import RuleItem from './RuleItem';
import { getChannels, getUserRules } from '../../../data/api/ApiConnect';
import './Rules.css';
import RuleCreate from '../RuleCreate/RuleCreate';
import { Redirect } from 'react-router';
import jwt from 'jsonwebtoken';

class Rules extends Component {


    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.getAppChannels = this.getAppChannels.bind(this);
        this.getAppUserRules = this.getAppUserRules.bind(this);
        this.state = {
            activeTab: '1',
            success: false
        };
        this.modifyRuleHandler = this.modifyRuleHandler.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    modifyRuleHandler(success) {    
        this.setState({
                success: success,
        });
        this.toggle('1');
    }

    getAppChannels(){
        var getChannelsCallback = function (channels) {
            this.setState({
                channels: channels
            });
        };
        getChannelsCallback = getChannelsCallback.bind(this);
        getChannels().then(getChannelsCallback);
    }
    getAppUserRules(){
        var getRulesCallback = function (rules) {
            this.setState({
              rules: rules
            });
        };
        getRulesCallback = getRulesCallback.bind(this);
        getUserRules(JSON.parse(jwt.decode(sessionStorage.getItem('jwtToken'))["data"])[0]["@id"][0]).then(getRulesCallback);
    }
    componentWillMount() {
        this.getAppChannels();
        this.getAppUserRules();
    }

    componentDidUpdate() {
        if (this.state.success) {
            this.setState({
                success: false
            });
            this.getAppUserRules();
        }
    }


    render() {
        if (sessionStorage.getItem('jwtToken')===null) {
            return <Redirect push to="/login" />;
        }

        if (typeof this.state.channels === "undefined") {
            return <div className="animated fadeIn"></div>
        }
        
        let rulesList = this.state.rules.map((rule, index) => 
        <RuleItem key={index} rule={rule} handler={this.modifyRuleHandler} />
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
                                {rulesList}
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col xs="12">
                                    <Card>
                                        <CardHeader>
                                            <strong>Create rule</strong>
                                        </CardHeader>
                                        <RuleCreate channels={this.state.channels} handler={this.modifyRuleHandler}/>
                                        
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
