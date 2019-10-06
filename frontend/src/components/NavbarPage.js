import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import AddEvent from './AddEvent'
import Username from './Username'

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


class NavbarPage extends Component {
  render() {
    if (!localStorage.getItem('token')) {
      return (
        <Navbar className="navbar-dark bg-dark" light expand="md">
          <NavbarBrand href="/"><h3>Plus One</h3></NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/login/" >Login</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      )
    }
    return (
      <Navbar className="navbar-dark bg-dark" light expand="md">
        <NavbarBrand href="/"><h3>Plus One</h3></NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem style={{marginLeft:'10px'}}>
            <NavLink
              tag={Link}
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('uid')
                localStorage.removeItem('username')
              }}
              to="/login">
              Logout
            </NavLink>
          </NavItem>
          <NavItem>
            <AddEvent />
          </NavItem>
          <NavItem style={{marginLeft:'10px'}}>
            <Username />
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default withRouter(NavbarPage)