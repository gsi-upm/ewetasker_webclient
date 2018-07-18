import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gsi from '../../assets/img/brand/gsi.png';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href='http://gsi.dit.upm.es'>EWE Tasker</a> &copy; 2018 GSI.  <img src={gsi} height='30px' alt='gsi-logo'/></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
