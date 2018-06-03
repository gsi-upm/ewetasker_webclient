import React, { Component } from 'react';
import { Col, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import RuleItem from './RuleItem';

class Rules extends Component {

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

    render (){
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
                                <RuleItem />
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                        <Row>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </div>
        );
    }
}

export default Rules;
