import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Register from './Register'
import Login from './Login'

export default class Auth extends Component {
  state = {
    username: "",
    password: ""
  }

  render() {

    return (
      <Container style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', width: "80%" }}>
        <Row style={{ width: '50%', justifyContent: 'center', margin: '15px' }}>
          <Col style={{ justifyContent: 'center' }}>
            <Register />
          </Col>
        </Row>
        <Row style={{ width: '50%', justifyContent: 'center', margin: '15px' }}>
          <Col style={{ justifyContent: 'center' }}>
            <Login />
          </Col>
        </Row>
      </Container>
    )
  }
}