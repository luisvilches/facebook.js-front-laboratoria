import React, { Component } from 'react';
import {Navbar,Nav,NavItem,Button,Grid,Row,Col,Radio,FormControl} from 'react-bootstrap';
import Navb from './Navbar';

var dev = 'http://localhost:5000';
var prod = '';

var API = dev;

class Post extends Component {


    render(){
        return(
            <div className="card">
                <textarea rows="4" className="form-control" placeholder="¿Qué está pasando?"></textarea>
                <br/>
                <input type="file" />
                <br/>
                <Button bsStyle="primary" className="pull-right">Publicar</Button>
                <FormControl componentClass="select" placeholder="select" className="pull-right FilterPost">
                    <option value="Amigos">Amigos</option>
                    <option value="Publico">Público</option>
                </FormControl>
                <br/>
            </div>
        )
    }
}

class Muro extends Component {
    render() {
        return (
        <Grid className="maxContainer">
            <Navb />
            <Row className="MarginTopHeader">
                <Post />
            </Row>
        </Grid>
        );
    }
}

export default Muro;
