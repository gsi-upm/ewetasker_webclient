import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Card, CardBody, CardFooter } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import { Link } from 'react-router-dom';
import { deleteRule } from '../../data/api/ApiConnect';
import './RuleWidget.css';
import { Redirect } from 'react-router';
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
  cssModule: PropTypes.object
};

const defaultProps = {
  header: '$1,999.50',
  mainText: 'Income',
  color: 'primary',
  variant: '0',
  link: '#',
};

class RuleWidget extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
    this.delete = this.delete.bind(this);
}

  delete(id){
    console.log(id)
    var deleteRuleCallback = function(result){
        this.setState({
            success: result,
        })
    }
    deleteRuleCallback = deleteRuleCallback.bind(this);
    deleteRule(id).then(deleteRuleCallback);
}

  render() {
    const { className, cssModule, header, mainText, events, actions, rule_id, color, footer, link, children, variant, ...attributes } = this.props;

    // demo purposes only
    const padding = { card: 'p-3', icon: 'p-3' , eventIcon: 'p-3', lead: 'mt-0' };

    const card = { style: 'clearfix', color: color, classes: '' };
    card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

    const lead = { style: 'h5 mb-0', color: color, classes: '' };
    lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

    const blockIcon = function (icon) {
      const classes = classNames(icon, 'bg-' + card.color, padding.icon, 'font-2xl mr-3 float-left rule-icon');
      return (<i className={classes}></i>);
    };

    if (this.state.success){
      return <Redirect to={{ pathname: '/rules' }} />;
    }

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

    let eventsIcons = events.map((event) => 
      blockIcon(event["foaf:logo"])
    );

    let actionsIcons = actions.map((action) => 
    blockIcon(action["foaf:logo"])
  );


    return (
        <Card>
          <CardBody className={card.classes} {...attributes}>
          <div class="row">
              <div class="col-sm-2">
                {eventsIcons}
              </div>
              <div class="col-sm-2">
                <i class="fa fa-arrow-circle-o-right arrow-icon p-3 font-2xl mr-3 float-left rule-icon"></i>
              </div>
              <div class="col-sm-2">
                {actionsIcons}
              </div>
              <div class="col-sm-6">
                <div className={lead.classes}>{header}<Badge onClick={()=>{this.delete(rule_id);}} className="badgeRule" color="danger">Delete</Badge></div>
                <div className="text-muted font-xs">{mainText}</div>
              </div>
            </div>
          </CardBody>
          {cardFooter()}
        </Card>
    );
  }
}

RuleWidget.propTypes = propTypes;
RuleWidget.defaultProps = defaultProps;

export default RuleWidget;