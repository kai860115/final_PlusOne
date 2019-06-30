import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';

export default class Home extends Component {
  state = {
    username: "",
    password: ""
  }

  render() {

    return (
      <Container style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
        <Col>
          <h4>Welcome to Plus One</h4>
        </Col>
      </Container>
    )
  }
}