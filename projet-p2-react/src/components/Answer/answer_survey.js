import React, { Component } from 'react';
import axios from "axios/index";
import mdcAutoInit from "@material/auto-init/index";
import {MDCTextField} from "@material/textfield/index";

export class AnswerSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            questions: [],
            answers: {},
            position: 0,
            getQuestions: false,
            isLastQuestion: false,
            isFinished: false,
            surveyTitle: ""
        };
    }


    componentDidMount(){
        console.log("heeeeeeeeeeeey");
        
        
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
                answers: answers,
                getQuestions:true,
                surveyTitle: response.data.survey[0].title
             });
            mdcAutoInit.register("MDCTextField", MDCTextField);
            mdcAutoInit();
        });
    }
    onBlur(event){
        let para = document.createElement('p');
        let target = event.target;
        if(!target.checkValidity()){
            this.displayErr("Votre réponse n'est pas valide" ,para,target);


        } else {
            // target.nextElementSibling.innerHTML = target.nextElementSibling.dataset.text;
            target.nextElementSibling.classList.remove("customError");
        }
    };

    displayErr(msgErr, para, target){
        if(!target.nextElementSibling.classList.contains("customError")){
            target.nextElementSibling.innerHTML = msgErr;
            target.nextElementSibling.classList.add("customError")
        }
    };




    submit(){
        let validForm = true;
        for(let i =0; i<document.getElementsByClassName("mdc-text-field__input").length;i++){
            if(!document.getElementsByClassName("mdc-text-field__input")[i].checkValidity()){
                validForm = false;
                break;
            }
        }
        if (validForm){
            let questionsLength = this.state.questions.length;
            let position = this.state.position;
            let questionId = this.state.questions[position].id;
            // this.state.questions.forEach(question => {
            //     let self = this;
            //     setTimeout(function() {
                        axios.post(`http://localhost:4000/answer`, {
                        content: this.state.answers[questionId].answer,
                        question_id: questionId,
                    }).then(response => {
                        // Update the local state with the received data after the PUT action (and set them as data is for index)
                        console.log("response",response);
                        if (response.status === 200){
                            position = ++position;
                            if(position === questionsLength -1 ) {
                                this.setState({isLastQuestion: true});
                            }
                            if(position === questionsLength) {
                                this.setState({
                                    isFinished: true,
                                    isLastQuestion: false
                                });
                            }
                            this.setState({position: position});
                            console.log("pos: ",position);
                            if(document.getElementsByClassName("mdc-text-field__input").length > 0){
                                document.getElementsByClassName("mdc-text-field__input")[0].value = "";
                            }
                        }
                    }).catch(error => {
                        console.log("err:",error);
                        // alert("Cette question existe déjà.");
                    });
                    
            //     },1000);
            // });
            
        // } else {
        //     alert("Un ou des champs ne sont pas valides");

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
        console.log("questions: ",this.state.questions);
        console.log("position: ",this.state.position);
        let getQuestions = this.state.getQuestions,
            isLastQuestion = this.state.isLastQuestion,
            isFinished = this.state.isFinished;
        return (
            <div>
                { getQuestions && !isLastQuestion && !isFinished ? (
                    <div className="container container--center home">
                        <div className="card">
                            <div className="question-item">
                                <h1>{this.state.surveyTitle}</h1>
                                <p><span className="question-title" key={this.state.questions[this.state.position].id}>{this.state.questions[this.state.position].title}</span></p>
                                <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                                    <input type="text" className="mdc-text-field__input" question-id={this.state.questions[this.state.position].id} required="required" onChange={this.onStateChange.bind(this)} onBlur={this.onBlur.bind(this)} />
                                    <label htmlFor="title" className="mdc-text-field__label">Votre réponse :</label>
                                </div>
                                <button type="button" className="mdc-button mdc-button--raised" onClick={this.submit.bind(this)}>
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                ) : ""}
                { getQuestions && isLastQuestion && !isFinished? (
                    <div className="container container--center home">
                        <div className="card">
                            <div className="question-item">
                                <h1>{this.state.surveyTitle}</h1>
                                <p><span className="question-title" key={this.state.questions[this.state.position].id}>{this.state.questions[this.state.position].title}</span></p>
                                <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                                    <input type="text" className="mdc-text-field__input" question-id={this.state.questions[this.state.position].id} required="required" onChange={this.onStateChange.bind(this)} onBlur={this.onBlur.bind(this)} />
                                    <label htmlFor="title" className="mdc-text-field__label">Votre réponse :</label>
                                </div>
                                <button type="button" className="mdc-button mdc-button--raised" onClick={this.submit.bind(this)}>
                                    Valider le questionnaire
                                </button>
                            </div>
                        </div>
                    </div>
                ) : ""}
                {
                    isFinished ?
                    "Votre questionnaire est validé !":
                    ""
                }
            </div>
        );
    }
}