import React, { Component } from 'react';
import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';
import axios from 'axios';


class registrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            firstName : "",
            lastName: "",
            company: "",
            password: "",
            passwordconfirm: ""
        }
        console.log("email start: ",this.state.email);
    }
    componentDidMount(){
        mdcAutoInit.register('MDCTextField', MDCTextField);
        mdcAutoInit();
    }

    onStateChange(event){


        this.setState({[event.target.id]:event.target.value});
        console.log("on est là",event.target);

    };

    displayErr(msgErr, para, target){
        if(!target.nextElementSibling.classList.contains("customError")){
            target.nextElementSibling.innerHTML = msgErr;
            target.nextElementSibling.classList.add("customError")
        }
    };

    onBlur(event){
        let para = document.createElement('p');
        let target = event.target;
        if(!target.checkValidity()){
            console.log("on est ici: ",event.target.id);
            switch (event.target.id){
                case "email":
                    this.displayErr('Votre e-mail est invalide',para,target).bind(this);
                    break;
                case "firstName":
                    this.displayErr('Votre prénom est requis',para,target).bind(this);
                    break;
                case "lastName":
                    this.displayErr('Votre nom est requis',para,target).bind(this);
                    break;
                case "password":
                    this.displayErr('Votre mot de passe doit comporter au minimum 6 caractères avec au moins 1 chiffre et 1 majuscule',para,target).bind(this);
                    break;
                default:
            }
        } else {
            target.nextElementSibling.innerHTML = target.nextElementSibling.dataset.text;
            target.nextElementSibling.classList.remove("customError");
        }
    };

    submit(){
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
                `http://`+window.location.hostname+`:4000/registration`,
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
                    this.setState({
                        email: "",
                        firstName: "",
                        lastName: "",
                        company: "",
                        password: "",
                        passwordconfirm: ""
                    });
                }
            }).catch(error => {
                console.log(error);
                alert("Le compte à cette adresse e-mail existe déjà.");
            });
        } else {
            alert("Un ou des champs ne sont pas valides");
            console.log("password: ",this.state.password," passwordconfirm: ",this.state.passwordconfirm);
        }

    };

    // Draw
    render() {
        return (
            <div className="container container--center home">
                <div className="card" id="registrationForm">
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="email" className="mdc-text-field__input" value={this.state.email} onChange={this.onStateChange.bind(this)} id="email" required="required" onBlur={this.onBlur}/>
                        <label htmlFor="email" className="mdc-text-field__label" data-text="E-mail">E-mail</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" value={this.state.firstName} onChange={this.onStateChange.bind(this)} id="firstName" required="required" onBlur={this.onBlur}/>
                        <label htmlFor="firstName" className="mdc-text-field__label" data-text="Prénom">Prénom</label>
                    </div>

                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" value={this.state.lastName} onChange={this.onStateChange.bind(this)} id="lastName" required="required" onBlur={this.onBlur}/>
                        <label htmlFor="lastName" className="mdc-text-field__label" data-text="Nom">Nom</label>
                    </div>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" value={this.state.company} onChange={this.onStateChange.bind(this)} id="company"/>
                        <label htmlFor="company" className="mdc-text-field__label">Entreprise</label>
                    </div>

                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="password" className="mdc-text-field__input" value={this.state.password} onChange={this.onStateChange.bind(this)} id="password" required="required" minLength="6" pattern="(?=.*[A-Z])(?=.*\d).*" onBlur={this.onBlur}/>
                        <label htmlFor="password" className="mdc-text-field__label" data-text="Mot de passe">Mot de passe</label>

                    </div>

                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="password" className="mdc-text-field__input" value={this.state.passwordconfirm} onChange={this.onStateChange.bind(this)} id="passwordconfirm" required="required"/>
                        <label htmlFor="passwordconfirm" className="mdc-text-field__label">Confirmez votre mot de passe</label>
                    </div>
                    <p>Les champs marqués par un astérisque (*) sont obligatoires.</p>


                    <button type="button" className="mdc-button mdc-button--raised" onClick={this.submit.bind(this)}>
                        Inscription
                    </button>
                </div>
            </div>
        );
    }
}

export default registrationForm