import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Mutation } from 'react-apollo'
import { SIGNUP_MUTATION } from '../graphql'

export default class Register extends Component {
  state = {
    email: '',
    username: '',
    name: "",
    password: ""
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0 && this.state.name.length > 0 && this.state.email.length > 0;
  }

  signUpComplete = (cache, { data }) => {
    window.alert(`Register Success, Please Login.`)

    this.setState({
      email: '',
      username: '',
      name: "",
      password: ""
    })
  }


  handleFormSubmit = e => {
    e.preventDefault()

    const { username, email, name, password } = this.state

    if (!username || !email || !name || !password) return

    this.signUp({
      variables: {
        email: email,
        username: username,
        name: name,
        password: password
      }
    })
  }


  render() {

    return (
      <Mutation mutation={SIGNUP_MUTATION} update={this.signUpComplete}>
        {(mutation, { loading, error }) => {
          this.signUp = mutation
          return (
            <React.Fragment>
              <h4>Register</h4>
              <hr />
              <Form onSubmit={this.handleFormSubmit}>
                <FormGroup>
                  <Label for="registerEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="registerEmail"
                    placeholder="with a placeholder"
                    onChange={e => this.setState({ email: e.target.value })}
                    value={this.state.email}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="registerUsername">Username</Label>
                  <Input
                    type="username"
                    name="username"
                    id="registerUsername"
                    placeholder="with a placeholder"
                    onChange={e => this.setState({ username: e.target.value })}

                    value={this.state.username}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="registerName">Name</Label>
                  <Input
                    type="name"
                    name="name"
                    id="registerName"
                    placeholder="with a placeholder"
                    onChange={e => this.setState({ name: e.target.value })}
                    value={this.state.name}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="registerPassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="registerPassword"
                    placeholder="password placeholder"
                    onChange={e => this.setState({ password: e.target.value })}

                    value={this.state.password}
                  />
                </FormGroup>
                <hr />
                <Button color="primary" size="lg" block disabled={!this.validateForm()}>Register</Button>
              </Form>
              {error &&
                <Alert color="danger">
                  {error.message}
                </Alert>}

            </React.Fragment>
          )
        }}
      </Mutation>


    )
  }
}