import React, { Component } from 'react';
import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';
import axios from 'axios';
import App from "../../App";


class loginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: this.props.email,
            password: this.props.password
        }
    }
    componentDidMount(){
        mdcAutoInit.register('MDCTextField', MDCTextField);
        mdcAutoInit();
    }

    onStateChange = (event) => {
        this.setState({[event.target.id]:event.target.value});
    };

    submit = () => {
        axios.post(
            `http://localhost:4000/session`,
            {
                email: this.state.email,
                password: this.state.password

            }
        ).then(response => {
            // Update the local state with the received data after the PUT action (and set them as data is for index)
            console.log("response",response)
            if(response.statusText === "Created"){
                localStorage.setItem("isLoggedIn",'true');
            }
            console.log("app: ",App);
            App.state = "logged";
        }).catch(error => console.log(error))
    };


    // Draw
    render() {
        return (
            <div className="card">
                <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                    <input type="email" className="mdc-text-field__input" onChange={this.onStateChange} id="email"/>
                    <label htmlFor="email" className="mdc-text-field__label" >E-mail</label>
                </div>
                <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                    <input type="password" className="mdc-text-field__input" onChange={this.onStateChange} id="password"/>
                    <label htmlFor="password" className="mdc-text-field__label">Mot de passe</label>

                </div>
                <button type="button" className="mdc-button mdc-button--raised" onClick={this.submit}>
                    Connexion
                </button>
            </div>

        );
    }
}

export default loginForm