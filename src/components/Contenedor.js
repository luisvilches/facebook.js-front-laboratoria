import React, { Component } from 'react';
import Muro from './Muro';
import Login from './Session';

class Contenedor extends Component {
    constructor(props){
        super(props);

        this.state = {
            session: true
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
