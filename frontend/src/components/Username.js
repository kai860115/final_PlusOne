import React, { Component } from 'react';
import { Button, Tooltip } from 'reactstrap';

export default class Username extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <span>
        <Button style={{borderRadius:'100%'}} className="mr-1" color="primary" id='username'>
          {localStorage.getItem('username').substr(0, 2)}
        </Button>
        <Tooltip placement='bottom' isOpen={this.state.tooltipOpen} target='username' toggle={this.toggle}>
          {localStorage.getItem('username')}
        </Tooltip>
      </span>
    );
  }
}