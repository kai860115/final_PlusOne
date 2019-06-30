import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Mutation } from 'react-apollo'
import { SIGNIN_MUTATION } from '../graphql'
import { Redirect } from 'react-router-dom'
import { ME_QUERY } from '../graphql'

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state

    if (!email || !password) return

    this.signInMutation({
      variables: {
        email: email,
        password: password
      }
    })
  }


  render() {

    return (
      <Mutation mutation={SIGNIN_MUTATION}
      refetchQueries={[{query: ME_QUERY}]}>
        {(mutation, { loading, error, data }) => {
          this.signInMutation = mutation
          if (data) {
            localStorage.setItem('token', data.signIn.token)
            localStorage.setItem('uid', data.signIn.id)
            localStorage.setItem('username', data.signIn.username)
            return <Redirect to="/" />;
          }

          return (
            <React.Fragment>
              <h4>Log In</h4>
              <hr />
              <Form onSubmit={this.handleFormSubmit}>
                <FormGroup>
                  <Label for="loginEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="loginEmail"
                    placeholder="with a placeholder"
                    onChange={e => this.setState({ email: e.target.value })}

                    value={this.state.email} />
                </FormGroup>
                <FormGroup>
                  <Label for="loginPassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="loginPassword"
                    placeholder="password placeholder"
                    onChange={e => this.setState({ password: e.target.value })}
                    value={this.state.password}
                  />
                </FormGroup>
                <hr />
                <Button
                  color="primary"
                  size="lg"
                  block
                  disabled={!this.validateForm()}
                >Login</Button>
                {error &&
                  <Alert color="danger">
                    {error.message}
                  </Alert>}
              </Form>
            </React.Fragment>
          )
        }}
      </Mutation>

    )
  }
}
