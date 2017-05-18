import React, { Component } from 'react';
import Muro from './Muro';
import Login from './Session';
import Navb from './Navbar';

class Contenedor extends Component {
    constructor(props){
        super(props);

        this.state = {
            session: false
        }
    }

    validationSession(){
        if(localStorage.getItem("success") === false || localStorage.getItem("success") === null){
            this.setState({
                session:false
            })
        } else {
            this.setState({
                session:true
            })
        }
    }

    componentWillMount(){
        this.validationSession();
    }


    render() {
        return (
        <div>
            {this.state.session ? <div><Navb  action={this.validationSession.bind(this)}/><Muro /></div> : <Login action={this.validationSession.bind(this)} />}
        </div>
        );
    }
}

export default Contenedor;
