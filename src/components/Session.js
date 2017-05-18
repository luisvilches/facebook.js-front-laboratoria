import React, { Component } from 'react';
import {Navbar,Nav,NavItem,Button,Grid,Row,Col,Radio,FormControl} from 'react-bootstrap'

var dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
var meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

class NavBarLogin extends Component {

    constructor(props){
        super(props);

        this.state = {
            messageAlerPass: 'El campo de usuario no puede estar en blanco',
            messageAlerUser: 'El campo de password no puede estar en blanco',
            alertPass: false,
            alertUser: false,
        }
    }

    login(){

        let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let mail = this.refs.mail.value;
        let pass = this.refs.pass.value;

        if(mail === '' || mail === null || mail === 'undefined'){
            this.setState({
                alertUser: true
            })
        }

        else if(!expr.test(mail)){
            this.setState({
                messageAlerUser: 'Correo invalido',
                alertUser: !this.state.alertUser
            })
        }

        else if(pass === '' || pass === null || pass === 'undefined'){
            this.setState({
                alertPass: true
            })
        }

        else if(this.state.alertPass === false && this.state.alertUser === false){
            alert('ok')
        }
    }

  render() {
    return (
      <div>
        <Navbar className="navb" collapseOnSelect fixedTop={true}>
            <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Facebook.js</a>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav pullRight>
                <NavItem eventKey={1}>
                    Correo electronico
                    <br/>
                    <input ref="mail" type="text" className="inputLogin" onChange={item => {this.setState({alertUser: false})}}/>
                    <p className={this.state.alertUser ? 'visible' : 'hidden'}>{this.state.messageAlerUser}</p>
                </NavItem>
                <NavItem eventKey={2}>
                    Contraseña
                    <br/>
                    <input ref="pass" type="password" className="inputLogin" onChange={item => {this.setState({alertPass: false})}}/>
                    <p className={this.state.alertPass ? 'visible' : 'hidden'}>{this.state.messageAlerPass}</p>
                </NavItem>
                <NavItem eventKey={3}>
                    <br/>
                    <Button bsStyle="primary" className="posButtonEnter" onClick={this.login.bind(this)}>Entrar</Button>
                </NavItem>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

class Global extends Component {
  render() {
    return (
      <div className="text-center">
        <h3>Facebook.js te ayuda a comunicarte y compartir <br/>con las personas que forman parte de tu vida. </h3>
        <br/>
        <img src="image/session.png" alt="" className="img-responsive centerd"/>
      </div>
    );
  }
}

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            days: dias,
            months: meses,
            years: []
        }
    }

    cargarListaAños(){

        var year = 2018;
        
        for(var i = 1920; i < year ; i++ ){
            this.state.years.push(i);
        }
    }

    componentWillMount(){
        this.cargarListaAños();
        console.log(this.state.years)
    }
    render() {
        return (
        <div>
            <h1><b>Registrarte</b></h1>
            <h4>Es gratis y lo sera siempre.</h4>
            <br/>
            <Col xs={12} md={6}>
                <input type="text" placeholder="Nombre" className="form-control"/>
            </Col>
            <Col xs={12} md={6}>
                <input type="text" placeholder="Apellidos" className="form-control"/>
                <br/>
            </Col>
            <Col xs={12} md={12}>
                <input type="text" placeholder="Correo electronico" className="form-control"/>
                <br/>
                <input type="text" placeholder="Contraseña nueva" className="form-control"/>
                <br/>
            </Col>
            <Col xs={4} md={4}>
                <FormControl componentClass="select" placeholder="select">
                    <option value="Día">Día</option>
                    {this.state.days.map((item,index) => {
                        return(
                            <option key={index} value={item}>{item}</option>
                        )
                    })}

                </FormControl>
            </Col>
            <Col xs={4} md={4}>
                <FormControl componentClass="select" placeholder="select">
                    <option value="select">Mes</option>
                    {this.state.months.map((item,index) => {
                        return(
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </FormControl>
            </Col>
            <Col xs={4} md={4}>
                <FormControl componentClass="select" placeholder="select">
                    <option value="select">Año</option>
                    {this.state.years.map((item,index) => {
                        return(
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </FormControl>
            </Col>
            <Col xs={12} md={12}>
                <br/>
                <Radio name="radioGroup" inline>
                    Hombre
                </Radio>
                <Radio name="radioGroup" inline>
                    Mujer
                </Radio>
            </Col>
            <Col xs={12} md={12}>
                <br/>
                <Button bsStyle="success">Terminado</Button>
            </Col>
        
        </div>
        );
    }
}

class Session extends Component {
  render() {
    return (
      <Grid>
        <NavBarLogin />
        <Row className="MarginTopHeader">
            <Col xs={12} md={7}>
                <Global />
            </Col>
            <Col xs={12} md={5}>
                <Register />
            </Col>
        </Row>
      </Grid>
    );
  }
}

export default Session;
