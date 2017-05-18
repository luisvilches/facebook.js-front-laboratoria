import React, { Component } from 'react';
import {Button,Grid,Row} from 'react-bootstrap';

var dev = 'http://localhost:5000';
//var prod = '';

var API = dev;

class Post extends Component {

    constructor(props){
        super(props);

        this.state = {
            alertUser: false
        }
    }

    publicar(){
        if(this.refs.textPost.value === '' || this.refs.textPost.value === 'undefined' || this.refs.textPost.value === null){
            this.setState({alertUser: true})
        }else{
            var formData = new FormData();
        formData.append('text', this.refs.textPost.value);
        formData.append('type', this.refs.publicacion.value);
        formData.append('by', localStorage.getItem('username'));

        if(this.refs.img.files[0]){
            formData.append('img',this.refs.img.files[0]);
            fetch(`${API}/createPostImagen`,{
                headers: {
                'Accept': 'application/json'
                },
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                this.refs.textPost.value = ""
                this.props.action();
                

            })
            

        }else{
            fetch(`${API}/createPost`,{
                headers: {
                'Accept': 'application/json'
                },
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                this.refs.textPost.value = ""
                this.props.action();
            })
        }
        }
    }


    render(){
        return(
            <div className="card">
                <textarea ref="textPost" rows="4" className="form-control" placeholder="¿Qué está pasando?" onChange={item => {this.setState({alertUser: false})}}></textarea>
                 <p className={this.state.alertUser ? 'visible alert' : 'hidden'}>este campo es requerido</p>
                <br/>
                <input ref="img" type="file" />
                <br/>
                <Button bsStyle="primary" className="pull-right" onClick={this.publicar.bind(this)}>Publicar</Button>
                <select ref="publicacion" className="pull-right FilterPost form-control">
                    <option value="Publico">Publico</option>
                    <option value="Amigos">Amigos</option>
                </select>
                
                <br/>
            </div>
        )
    }
}

class Muro extends Component {
    constructor(props){
        super(props);

        this.state = {
            edit: 'Editar',
            statusEdit: false,
            posts: [],
            change: ''
        }
    }

    cargarPosts(){
        fetch(`${API}/posts`)
        .then(res => res.json())
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
    }

    deleted(id){

            var r = confirm("¿Deseas eliminar este Post?");
            if (r == true) {
            
           fetch(`${API}/post/delete/${id}`)
            .then(res => res.json())
            .then(response => {
                alert(response.message)
                this.componentWillMount();
            })
            } else {
            
            }    
    }


    componentWillMount(){
        this.cargarPosts();
    }


    updated(edit,textarea,ButtonEdit,id){
        if(document.getElementById(ButtonEdit).text == 'Editar'){
            document.getElementById(ButtonEdit).text = 'Guardar'
            document.getElementById(edit).classList.toggle("hidden");
            document.getElementById(textarea).classList.toggle("hidden");
        }else if(document.getElementById(ButtonEdit).text == 'Guardar'){
            var formData = new FormData();
            formData.append('text', document.getElementById(textarea).value);

            fetch(`${API}/post/update/${id}`,{
                method: 'POST',
                headers:  {
                    "Accept":"application/json"
                },
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                document.getElementById(ButtonEdit).text = 'Editar'
                document.getElementById(edit).classList.toggle("hidden");
                document.getElementById(textarea).classList.toggle("hidden");
                this.componentWillMount();
            })
        }
    }

    handleOnBlur(e) {
       //this.replaceState({change:''})
    }

    filterAmigos(){
            var data = this.state.posts.filter(item => {return item.type == 'Amigos'})
            this.setState({posts:data})
        }
    render() {
        return (
        <Grid className="maxContainer">
            <Row className="MarginTopHeader">
                <Post action={this.componentWillMount.bind(this)}/>
            </Row>
            <Row>
                <br/>
                {this.state.posts.map((item,index) => {
                
                        return(
                            <div className="card MarginBottom" key={index}>
                                <p><b>{item.by}</b></p>
                                <img src={item.img} alt="" className="img-responsive centerd"/>
                                <br/>
                                <p id={'edit'+index} className='visible'>{item.text}</p>
                                <textarea ref="ed" id={'textarea'+index} className='hidden form-control' rows="3" defaultValue={item.text}></textarea>
                                <br/>
                                <br/>
                                <a id={'ButtonEdit'+index} className="MarginRight" onClick={this.updated.bind(this,`edit${index}`,`textarea${index}`,`ButtonEdit${index}`,item._id)}>{this.state.edit}</a>
                                <a onClick={this.deleted.bind(this,item._id)}>Eliminar</a>
                            </div>
                        )
                    }
                )}
            </Row>
            <div className="filter">
                <h3>Filtros</h3>
                <Button onClick={this.componentWillMount.bind(this)}>Publico</Button>
                <Button onClick={this.filterAmigos.bind(this)}>Amigos</Button>
            </div>
        </Grid>
        );
    }
}

export default Muro;
