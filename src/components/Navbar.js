import React, { Component } from 'react';
import {Navbar,Nav,NavItem} from 'react-bootstrap';

var dev = 'http://localhost:5000';
var prod = '';

var API = dev;


class Navb extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: ''
        }
    }

    closeSession(){
        localStorage.clear();
        this.props.action();
    }

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
                        {localStorage.getItem('username')}
                    </NavItem>
                    <NavItem eventKey={2} onClick={this.closeSession.bind(this)}>
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
