import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import BaseContainer from './components/BaseContainer';
import Contenedor from './components/Contenedor';
import Muro from './components/Muro';
import Login from './components/Session';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={BaseContainer}>
        <IndexRoute component={Contenedor}  />
    </Route>
  </Router>,
  document.getElementById('root')
);
