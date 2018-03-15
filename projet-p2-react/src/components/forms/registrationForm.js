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
            password: this.props.password,
            passwordconfirm: this.props.passwordconfirm
        }
    }
    componentDidMount(){
        mdcAutoInit.register('MDCTextField', MDCTextField);
        mdcAutoInit();
    }

    onStateChange = (event) => {


        this.setState({[event.target.id]:event.target.value});
        console.log("on est là",event.target);

    };

    displayErr = (msgErr, para, target) => {
        if(!target.nextElementSibling.classList.contains("customError")){
            target.nextElementSibling.innerHTML = msgErr;
            target.nextElementSibling.classList.add("customError")
        }
    };

    onBlur = (event) => {
        let para = document.createElement('p');
        let target = event.target;
        if(!target.checkValidity()){
            console.log("on est ici: ",event.target.id);
            switch (event.target.id){
                case "email":
                    this.displayErr('Votre e-mail est invalide',para,target);
                    break;
                case "firstName":
                    this.displayErr('Votre prénom est requis',para,target);
                    break;
                case "lastName":
                    this.displayErr('Votre nom est requis',para,target);
                    break;
                case "password":
                    this.displayErr('Votre mot de passe doit comporter au minimum 6 caractères avec au moins 1 chiffre et 1 majuscule',para,target);
                    break;
                default:
            }
        } else {
            target.nextElementSibling.innerHTML = target.nextElementSibling.dataset.text;
            target.nextElementSibling.classList.remove("customError");
        }
    };

    submit = () => {
        let validForm = true;
        for(let i =0; i<document.getElementsByClassName("mdc-text-field__input").length;i++){
            if(!document.getElementsByClassName("mdc-text-field__input")[i].checkValidity()){
                console.log("c'est faux");
                validForm = false;
                break;
            }
        }
        if (validForm && this.state.password === this.state.passwordconfirm){
            axios.post(
                `http://localhost:4000/registration`,
                {
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    company: this.state.company,
                    password: this.state.password,

                }
            ).then(response => {
                // Update the local state with the received data after the PUT action (and set them as data is for index)
                console.log("response",response);
                if (response.statusText === "Created"){
                    alert("Votre compte a été crée.");
                }
            }).catch(error => console.log(error))
        } else {
            alert("Un ou des champs ne sont pas valides");
            console.log("password: ",this.state.password," passwordconfirm: ",this.state.passwordconfirm);
        }

    };

    // Draw
    render() {
        return (
            <div className="container container--center home">
                <div className="card">
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="email" className="mdc-text-field__input" onChange={this.onStateChange} id="email" required="required" onBlur={this.onBlur}/>
                        <label htmlFor="email" className="mdc-text-field__label" data-text="E-mail">E-mail</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" onChange={this.onStateChange} id="firstName" required="required" onBlur={this.onBlur}/>
                        <label htmlFor="firstName" className="mdc-text-field__label" data-text="Prénom">Prénom</label>
                    </div>

                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" onChange={this.onStateChange} id="lastName" required="required" onBlur={this.onBlur}/>
                        <label htmlFor="lastName" className="mdc-text-field__label" data-text="Nom">Nom</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" onChange={this.onStateChange} id="company"/>
                        <label htmlFor="company" className="mdc-text-field__label">Entreprise</label>
                    </div>

                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="password" className="mdc-text-field__input" onChange={this.onStateChange} id="password" required="required" minLength="6" pattern="(?=.*[A-Z])(?=.*\d).*" onBlur={this.onBlur}/>
                        <label htmlFor="password" className="mdc-text-field__label" data-text="Mot de passe">Mot de passe</label>

                    </div>

                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="password" className="mdc-text-field__input" onChange={this.onStateChange} id="passwordconfirm" required="required"/>
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