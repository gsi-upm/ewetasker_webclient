import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class ChannelImportedAlert extends Component {

    constructor(props){
        super(props);

        this.state = {
            visible: props.visible
        }

        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    render() {
        return (
          <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
            Channel succesfully imported !
          </Alert>
        );
      }
}

export default ChannelImportedAlert;