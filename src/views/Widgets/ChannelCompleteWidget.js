import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Card, CardBody, CardFooter, Col, Collapse, ListGroup, ListGroupItem, Row } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import './ChannelCompleteWidget.css';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  footer: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  header: '$1,999.50',
  mainText: 'Income',
  icon: 'fa fa-cogs',
  color: 'primary',
  variant: '0',
  link: '#',
};

class ChannelCompleteWidget extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapse: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({
      collapse: !this.state.collapse
    })
  }
  render() {
    const { className, cssModule, header, mainText, icon, color, footer, link, children, variant, ...attributes } = this.props;

    // demo purposes only
    const padding = (variant === '0' ? { card: 'p-3', icon: 'p-3', lead: 'mt-0' } : (variant === '1' ? {
      card: 'p-0', icon: 'p-4', lead: 'pt-3',
    } : { card: 'p-0', icon: 'p-4 px-5', lead: 'pt-3' }));

    const card = { style: 'clearfix', color: color, icon: icon, classes: '' };
    card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

    const lead = { style: 'h5 mb-0', color: color, classes: '' };
    lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

    const blockIcon = function (icon) {
      const classes = classNames(icon, 'bg-' + card.color, padding.icon, 'font-2xl mr-3 float-left');
      return (<i className={classes}></i>);
    };

    const cardFooter = function () {
      if (footer) {
        return (
          <CardFooter className="px-3 py-2">
            <a className="font-weight-bold font-xs btn-block text-muted" href={link}>View More
              <i className="fa fa-angle-right float-right font-lg"></i></a>
          </CardFooter>
        );
      }
    };

    let eventsList = this.props.events.map((event, index) => 
      <ListGroupItem key={index}>{event.label}</ListGroupItem>
    );

    let actionsList = this.props.actions.map((action, index) => 
      <ListGroupItem key={index}>{action.label}</ListGroupItem>
    );

    return (
      <Card onClick={this.toggle}>
        <CardBody className={card.classes} {...attributes}>
        <Row>
          <Col xs="12">
          {blockIcon(card.icon)}
          <div className={lead.classes}>{header}<Badge className="badgeChannel" color="success">Edit</Badge></div>
          <div className="channelDescription text-muted font-xs">{mainText}</div>
          </Col>
          </Row>
          <Collapse isOpen={this.state.collapse} >
          <Row>
            <Col xs="12">
              <Row>
              <Col xs="6">
              <div className="events">
              <h4 className="text-muted text-uppercase font-xs">Events</h4>
              <ListGroup>
                {eventsList}
              </ListGroup>
              </div>
              </Col>
              <Col xs="6">
              <div className="actions">
              <h4 className="text-muted text-uppercase font-xs">Actions</h4>
              <ListGroup>
                {actionsList}
              </ListGroup>
              </div>
              </Col>
              </Row>
              </Col>
          </Row>
          </Collapse>
        </CardBody>
        {cardFooter()}
      </Card>
    );
  }
}

ChannelCompleteWidget.propTypes = propTypes;
ChannelCompleteWidget.defaultProps = defaultProps;

export default ChannelCompleteWidget;