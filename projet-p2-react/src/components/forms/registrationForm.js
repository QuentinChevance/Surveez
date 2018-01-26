import React, { Component } from 'react';
import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';
import axios from 'axios';

class registrationForm extends Component {
    componentDidMount(){
        mdcAutoInit.register('MDCTextField', MDCTextField);
        mdcAutoInit();
    }

    onClick = () => {
        console.log("email",document.getElementById("email"));
        axios.post(
            `http://localhost:4000/registration`,
            {
                email: document.getElementById("email").value,
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                company: document.getElementById("company").value,
                password: document.getElementById("password").value

            }
        ).then(response => {
            // Update the local state with the received data after the PUT action (and set them as data is for index)
            console.log("response",response)
        }).catch(error => console.log(error))
    };

    // Draw
    render() {
        return (
            <div className="container container--center home">
                <div className="card">
                    <h2 className="mdc-typography--display3">Surveez</h2>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="email" className="mdc-text-field__input" id="email"/>
                        <label htmlFor="email" className="mdc-text-field__label">E-mail</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" id="firstName"/>
                        <label htmlFor="firstName" className="mdc-text-field__label">Prénom</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" id="lastName"/>
                        <label htmlFor="lastName" className="mdc-text-field__label">Nom</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" id="company"/>
                        <label htmlFor="company" className="mdc-text-field__label">Entreprise</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="password" className="mdc-text-field__input" id="password"/>
                        <label htmlFor="password" className="mdc-text-field__label">Mot de passe</label>

                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="password" className="mdc-text-field__input" id="passwordconfirm"/>
                        <label htmlFor="passwordconfirm" className="mdc-text-field__label">Confirmez votre mot de passe</label>
                    </div>

                    <button type="button" className="mdc-button mdc-button--raised" onClick={this.onClick}>
                        Inscription
                    </button>
                </div>
            </div>
        );
    }
}

export default registrationForm