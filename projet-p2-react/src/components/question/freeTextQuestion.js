import React, { Component } from 'react';
import axios from "axios/index";
import mdcAutoInit from "@material/auto-init/index";
import { MDCTextField } from "@material/textfield/index";


class freeTextQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            currentType: 1

        }

    }
    componentDidMount() {
        mdcAutoInit.register("MDCTextField", MDCTextField);
        mdcAutoInit();
    }

    onStateChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    };

    displayErr(msgErr, para, target) {
        if (!target.nextElementSibling.classList.contains("customError")) {
            target.nextElementSibling.innerHTML = msgErr;
            target.nextElementSibling.classList.add("customError")
        }
    };

    onBlur(event) {
        let para = document.createElement('p'),
            target = event.target;
        if (!target.checkValidity()) {
            this.displayErr("Votre question n'est pas valide", para, target);
        } else {
            target.nextElementSibling.innerHTML = target.nextElementSibling.dataset.text;
            target.nextElementSibling.classList.remove("customError");
        }
    };

    submit(headers) {
        let validForm = true;
        for (let i = 0; i < document.getElementsByClassName("mdc-text-field__input").length; i++) {
            if (!document.getElementsByClassName("mdc-text-field__input")[i].checkValidity()) {
                validForm = false;
                break;
            }
        }
        if (validForm) {
            axios.post(`http://${window.location.hostname}:4000/question`, {
                title: this.state.title,
                typeQuestion: 1,
                format: 'texte',
                parent_id: 1,
                survey_id: localStorage.getItem("currentSurveyId"),
            },
                {
                    headers: {
                        'Authorization': localStorage.getItem("auth_token"),
                    }
                }
            ).then(response => {
                if (response.status === 200) {
                    alert("Votre question a été crée.");
                    this.setState({
                        title: "",

                    });
                }
            }).catch(error => {
                console.error(error);
                alert("Cette question existe déjà.");
            });
        } else {
            alert("Un ou des champs ne sont pas valides");
        }

    };

    render() {
        return (
            <div className="container container--center home">
                <div className="card">

                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" value={this.state.title} onChange={this.onStateChange.bind(this)} id="title" required="required" onBlur={this.onBlur.bind(this)} />
                        <label htmlFor="title" className="mdc-text-field__label" data-text="question">Votre question :</label>
                    </div>

                    <button type="button" className="mdc-button mdc-button--raised" onClick={this.submit.bind(this)}>
                        Ajouter
                    </button>
                </div>
            </div>
        );
    }
}

export default freeTextQuestion;