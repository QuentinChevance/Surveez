import React, { Component } from 'react';
import {NavLink, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import RegistrationForm from './registrationForm';
import LoginForm from './loginForm';

class authentication extends Component{
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login
        };
    }

    render(){
        return(
        <Router>
            <div className="container container--center home">
                <div className="card">
                    <h2 className="mdc-typography--display3 Title">Surveez</h2>

                    <nav id="basic-tab-bar" className="mdc-tab-bar">
                        <NavLink to="/signup" activeClassName="mdc-tab--active" className="mdc-tab">Inscription</NavLink>
                        <NavLink to="/login" activeClassName="mdc-tab--active" className="mdc-tab" name="login">Connexion</NavLink>
                        <span className="mdc-tab-bar__indicator"/>
                    </nav>
                    <Route path="/login" render={props => (<LoginForm handler={this.props.handler}/>)}/>
                    <Route path="/signup" component={RegistrationForm}/>
                    <Redirect to="/login" />

                </div>
            </div>
        </Router>
        );



    }
}
export default authentication