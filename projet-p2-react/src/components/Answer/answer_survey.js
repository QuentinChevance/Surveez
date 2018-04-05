import React, { Component } from 'react';
import axios from "axios/index";
import mdcAutoInit from "@material/auto-init/index";
import { MDCTextField } from "@material/textfield/index";

class AnswerSurvey extends Component {
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

    componentWillMount() {
        axios.get("http://" + window.location.hostname + ":4000" + window.location.pathname + window.location.search).then(response => {
            let answers = {}, // eslint-disable-next-line
                answer = 0; 
            response.data.questions.forEach(question => {
                answers[question.id] = [{
                    question_id: question.id,
                    answer: ""
                }]
                answer++;
            });

            this.setState({
                questions: response.data.questions,
                answers: answers,
                getQuestions: true,
                surveyTitle: response.data.survey[0].title
            });
            mdcAutoInit.register("MDCTextField", MDCTextField);
            mdcAutoInit();
        });
    }

    componentDidUpdate(){
        mdcAutoInit.register("MDCTextField", MDCTextField);
        mdcAutoInit();
    }

    onBlur(event) {
        let para = document.createElement('p'),
            target = event.target;
        if (!target.checkValidity()) {
            this.displayErr("Votre réponse n'est pas valide", para, target);


        } else {
            target.nextElementSibling.classList.remove("customError");
        }
    };

    displayErr(msgErr, para, target) {
        if (!target.nextElementSibling.classList.contains("customError")) {
            target.nextElementSibling.innerHTML = msgErr;
            target.nextElementSibling.classList.add("customError")
        }
    };




    submit() {
        let validForm = true;
        for (let i = 0; i < document.getElementsByClassName("mdc-text-field__input").length; i++) {
            if (!document.getElementsByClassName("mdc-text-field__input")[i].checkValidity()) {
                validForm = false;
                break;
            }
        }
        if (validForm) {
            let questionsLength = this.state.questions.length;
            let position = this.state.position;
            let questionId = this.state.questions[position].id;
            axios.post(`http://${window.location.hostname}:4000/answer`, {
                content: this.state.answers[questionId].answer,
                question_id: questionId,
            }).then(response => {
                if (response.status === 200) {
                    position = ++position;
                    if (position === questionsLength - 1) {
                        this.setState({ isLastQuestion: true });
                    }
                    if (position === questionsLength) {
                        this.setState({
                            isFinished: true,
                            isLastQuestion: false
                        });
                    }
                    this.setState({ position: position });
                    if (document.getElementsByClassName("mdc-text-field__input").length > 0) {
                        document.getElementsByClassName("mdc-text-field__input")[0].value = "";
                    }
                }
            }).catch(error => {
                console.error("err:", error);
            });
        }

    };

    onStateChange(event) {
        let question_id = event.target.getAttribute("question-id"),
            answers = this.state.answers;
        answers[question_id].answer = event.target.value;
        this.setState({ answers: answers });
    }


    render() {
        let getQuestions = this.state.getQuestions,
            isLastQuestion = this.state.isLastQuestion,
            isFinished = this.state.isFinished;
        return (
            <div>
                {getQuestions && !isLastQuestion && !isFinished ? (
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
                {getQuestions && isLastQuestion && !isFinished ? (
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
                        <div className="container container--center home">
                            <div className="card">
                                <h3>Vos réponses ont été envoyées.</h3>
                            </div>
                        </div> :
                        ""
                }
            </div>
        );
    }
}
export default AnswerSurvey;