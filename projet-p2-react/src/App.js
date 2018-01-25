import React, { Component } from 'react';
import '../node_modules/material-components-web/dist/material-components-web';
import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';

import './general.js';
import './App.css';

class App extends React.Component {
    componentDidMount(){
        mdcAutoInit.register('MDCTextField', MDCTextField);
    }
    render() {
        return (

              <body className="container container--center home">
              <div className="card">
                  <h2 className="mdc-typography--display3">Surveez</h2>
                  <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                      <input type="text" className="mdc-text-field__input" id="email"/>
                      <label htmlFor="email" className="mdc-text-field__label">E-mail</label>
                  </div>
                  <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                      <input type="text" className="mdc-text-field__input" id="emailconfirm"/>
                      <label htmlFor="emailconfirm" className="mdc-text-field__label">Confirmez votre e-mail</label>
                  </div>
                  <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                      <input type="password" className="mdc-text-field__input" id="password"/>
                      <label htmlFor="password" className="mdc-text-field__label">Mot de passe</label>

                  </div>
                  <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                      <input type="password" className="mdc-text-field__input" id="passwordconfirm"/>
                      <label htmlFor="passwordconfirm" className="mdc-text-field__label">Confirmez votre mot de passe</label>
                  </div>

                  <button type="button" className="mdc-button mdc-button--raised">
                      Inscription
                  </button>
              </div>
              </body>
        );
    }
}

export default App;
