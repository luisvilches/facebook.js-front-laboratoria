import React, { Component } from 'react';
import {Navbar,Nav,NavItem,Button,Grid,Row,Col} from 'react-bootstrap'

var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

var dev = 'http://localhost:5000';
var prod = '';

var API = dev;


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
            var formData = new FormData();
            formData.append('mail', mail)
            formData.append('pass', pass)

            fetch(`${API}/login`,{
                headers: {
                'Accept': 'application/json'
                },
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if(response.success === true){
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('success', response.success);
                    localStorage.setItem('user', response.user._id);
                    localStorage.setItem('username', `${response.user.name} ${response.user.lastname}`);
                    console.log(response)
                    this.props.reload();

                }else if(response.success === false){
                    alert('Error: '+response.message)
                }else{
                    alert('Error de autenticacion, intente mas tarde')
                }
            })
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
            messageAlert: '',
            alertPass: false,
            alertUser: false,
            alertName: false,
        }
    }

    register(){
        let mail = this.refs.correo.value;
        let pass = this.refs.password.value;
        let name = this.refs.name.value;
        let lastname = this.refs.lastname.value;

        if(name === '' || name === null || name === 'undefined'){
            this.setState({
                messageAlert: 'Este campo no puede estar vacio',
                alertName: true
            })
        }

        if(lastname === '' || lastname === null || lastname === 'undefined'){
            this.setState({
                messageAlert: 'Este campo no puede estar vacio',
                alertLastname: true
            })
        }

        if(mail === '' || mail === null || mail === 'undefined'){
            this.setState({
                messageAlert: 'Este campo no puede estar vacio',
                alertUser: true
            })
        }

        else if(!expr.test(mail)){
            this.setState({
                messageAlert: 'Correo invalido',
                alertUser: !this.state.alertUser
            })
        }

        else if(pass === '' || pass === null || pass === 'undefined'){
            this.setState({
                messageAlert: 'Este campo no puede estar vacio',
                alertPass: true
            })
        }

        else if(this.state.alertPass === false && this.state.alertUser === false && this.state.alertName === false){
            var formData = new FormData();
            formData.append('name', name)
            formData.append('lastname', lastname)
            formData.append('mail', mail)
            formData.append('pass', pass)

            fetch(`${API}/create`,{
                headers: {
                'Accept': 'application/json'
                },
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if(response.status === 'success'){
                    alert(response.message)
                }else{
                    alert(response.message)
                }
            })
        }
    }

    componentWillMount(){

    }
    render() {
        return (
        <div>
            <h1><b>Registrarte</b></h1>
            <h4>Es gratis y lo sera siempre.</h4>
            <br/>
            <Col xs={12} md={6}>
                <input ref="name" type="text" placeholder="Nombre" className="form-control"/>
            </Col>
            <Col xs={12} md={6}>
                <input ref="lastname" type="text" placeholder="Apellidos" className="form-control"/>
                <br/>
            </Col>
            <Col xs={12} md={12}>
                <input ref="correo" type="text" placeholder="Correo electronico" className="form-control"/>
                <br/>
                <input ref="password" type="text" placeholder="Contraseña nueva" className="form-control"/>
                <br/>
            </Col>
            <Col xs={12} md={12}>
                <br/>
                <Button bsStyle="success" onClick={this.register.bind(this)}>Terminado</Button>
            </Col>
        
        </div>
        );
    }
}

class Session extends Component {
  render() {
    return (
      <Grid>
        <NavBarLogin reload={this.props.action}/>
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
