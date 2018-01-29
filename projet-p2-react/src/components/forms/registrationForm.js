import React, { Component } from 'react';
import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';
import axios from 'axios';


class registrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: this.props.email,
            firstName : this.props.firstName,
            lastName: this.props.lastName,
            company: this.props.company,
            password: this.props.password
        }
    }
    componentDidMount(){
        mdcAutoInit.register('MDCTextField', MDCTextField);
        mdcAutoInit();
    }

    onStateChange = (event) => {
        console.log("on est là");
        this.setState({[event.target.id]:event.target.value});
    };

    submit = () => {
        console.log("email",this.state.email);
        axios.post(
            `http://localhost:4000/registration`,
            {
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                company: this.state.company,
                password: this.state.password

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
                        <input type="email" className="mdc-text-field__input" onChange={this.onStateChange} id="email"/>
                        <label htmlFor="email" className="mdc-text-field__label" >E-mail</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" onChange={this.onStateChange} id="firstName"/>
                        <label htmlFor="firstName" className="mdc-text-field__label">Prénom</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" onChange={this.onStateChange} id="lastName"/>
                        <label htmlFor="lastName" className="mdc-text-field__label">Nom</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" onChange={this.onStateChange} id="company"/>
                        <label htmlFor="company" className="mdc-text-field__label">Entreprise</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="password" className="mdc-text-field__input" onChange={this.onStateChange} id="password"/>
                        <label htmlFor="password" className="mdc-text-field__label">Mot de passe</label>

                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="password" className="mdc-text-field__input" onChange={this.onStateChange} id="passwordconfirm"/>
                        <label htmlFor="passwordconfirm" className="mdc-text-field__label">Confirmez votre mot de passe</label>
                    </div>

                    <button type="button" className="mdc-button mdc-button--raised" onClick={this.submit}>
                        Inscription
                    </button>
                </div>
            </div>
        );
    }
}

export default registrationForm