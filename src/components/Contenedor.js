import React, { Component } from 'react';
import Muro from './Muro';
import Login from './Session';

var dev = 'http://localhost:5000';
var prod = '';

var API = dev;

class Contenedor extends Component {
    constructor(props){
        super(props);

        this.state = {
            session: false
        }
    }

    render() {
        return (
        <div>
            {this.state.session ? <Muro /> : <Login />}
        </div>
        );
    }
}

export default Contenedor;
