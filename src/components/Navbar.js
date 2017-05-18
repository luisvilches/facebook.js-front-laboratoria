import React, { Component } from 'react';
import {Navbar,Nav,NavItem,Button,Grid,Row,Col,Radio,FormControl} from 'react-bootstrap'


class Navb extends Component {
  render() {
    return (
      <div>
        <Navbar className="navb" collapseOnSelect fixedTop={true}>
            <Navbar.Header>
            <Navbar.Brand>
                <a href="#" className="LogoInt">Facebook.js</a>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">
                    Luis
                </NavItem>
                <NavItem eventKey={2} href="#">
                    Cerrar Session
                </NavItem>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navb;
