import React, { Component } from 'react';
import axios from "axios/index";

export class AnswerSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            questions: [],
            answers: {}
        };
    }
    // axios({ method: 'POST', url: 'you http api here', headers: {autorizacion: localStorage.token}
    componentWillMount() {
        axios.get("http://" + window.location.hostname + ":4000" + window.location.pathname + window.location.search).then(response => {
            // this.setState({"user_id": response.data.id});
            console.log("response ", response);
            let answers = {},
                answer = 0;
            response.data.questions.forEach(question => {
                answers[question.id] = [{
                    question_id: question.id,
                    answer: ""
                }] 
                answer++;
            });

            console.log("answers: ",answers)
            this.setState({
                questions: response.data.questions,
                answers: answers
             });
        });
    }
    onBlur(event){
        let para = document.createElement('p');
        let target = event.target;
        if(!target.checkValidity()){
            this.displayErr("Votre réponse n'est pas valide" ,para,target);


        } else {
            target.nextElementSibling.innerHTML = target.nextElementSibling.dataset.text;
            target.nextElementSibling.classList.remove("customError");
        }
    };

    displayErr(msgErr, para, target){
        if(!target.nextElementSibling.classList.contains("customError")){
            target.nextElementSibling.innerHTML = msgErr;
            target.nextElementSibling.classList.add("customError")
        }
    };




    submit(headers){
        let validForm = true;
        for(let i =0; i<document.getElementsByClassName("mdc-text-field__input").length;i++){
            if(!document.getElementsByClassName("mdc-text-field__input")[i].checkValidity()){
                validForm = false;
                break;
            }
        }
        if (validForm){
            let questionsLength = this.state.questions.length;
            this.state.questions.forEach(question => {
                let self = this;
                setTimeout(function() {
                        axios.post(`http://localhost:4000/answer`, {
                        content: self.state.answers[question.id].answer,
                        question_id: question.id,
                    }).then(response => {
                        // Update the local state with the received data after the PUT action (and set them as data is for index)
                        console.log("response",response);
                        if (response.status === 200){
                            
                            // alert("Vos réponses ont été envoyées.");
                            // this.setState({
                            //     title: "",

                            // });
                        }
                    }).catch(error => {
                        console.log("err:",error);
                        // alert("Cette question existe déjà.");
                    });
                },1000);
            });
            
        } else {
            alert("Un ou des champs ne sont pas valides");

        }

    };

    onStateChange(event){
        let question_id = event.target.getAttribute("question-id");
        console.log("target: ",question_id);
        let answers = this.state.answers;
        answers[question_id].answer = event.target.value;
        this.setState({answers : answers});
    }


    render() {
        return (
            <div>
                {this.state.questions.map(question =>
                <div className="question-item">
                    <p><span className="question-title" key={question.id}>{question.title}</span></p>
                    <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" question-id={question.id} required="required" onChange={this.onStateChange.bind(this)} onBlur={this.onBlur.bind(this)} />
                        <label htmlFor="title" className="mdc-text-field__label" data-text="response">Votre réponse :</label>
                    </div>
                </div>)}
                <button type="button" className="mdc-button mdc-button--raised" onClick={this.submit.bind(this)}>
                    Valider vos réponses
                </button>
            </div>
        );
    }
}