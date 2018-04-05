import React, { Component } from 'react';
import mdcAutoInit from '@material/auto-init';
import { MDCTextField } from '@material/textfield';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //eslint-disable-line


class modifySurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            scope: false,
            user_id: this.props.user_id,
            survey_url: this.props.match.params.url,
            questions: []
        }
    }
    componentDidMount() {
        mdcAutoInit.register('MDCTextField', MDCTextField);
        mdcAutoInit();
        axios.get(`http://` + window.location.hostname + `:4000/session`, {
            headers: {
                Authorization: localStorage.getItem("auth_token")
            }
        }).then(response => {
            this.setState({ "user_id": response.data.id });
            axios.get(
                `http://` + window.location.hostname + `:4000/answer`, {
                    params: {
                        url: this.state.survey_url

                    }
                }
            ).then(response => {
                this.setState({
                    questions: response.data.questions,
                    survey_id: response.data.id
                });
                mdcAutoInit.register('MDCTextField', MDCTextField);
                mdcAutoInit();
                localStorage.setItem("currentSurveyId", response.data.id);
            }).catch(error => console.error(error))
        });
    }

    // Draw
    render() {
        return (

            <div className="card">

                {this.state.questions.map(question =>
                    <div className="mdc-text-field mdc-text-field--upgraded" data-mdc-auto-init="MDCTextField">
                        <input type="text" className="mdc-text-field__input" id="title" />
                        <label htmlFor="title" className="mdc-text-field__label" data-text={question.title} >Titre </label>
                    </div>
                )}


                <div className="mdc-form-field">
                    <div className="mdc-checkbox">
                        <input type="checkbox"
                            id="scope"
                            className="mdc-checkbox__native-control" checked={this.state.scope} onChange={this.onChangeCkBox.bind(this)} />
                        <div className="mdc-checkbox__background">
                            <svg className="mdc-checkbox__checkmark"
                                viewBox="0 0 24 24">
                                <path className="mdc-checkbox__checkmark-path"
                                    fill="none"
                                    stroke="white"
                                    d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                            </svg>
                            <div className="mdc-checkbox__mixedmark"></div>
                        </div>
                    </div>

                    <label htmlFor="scope">Privé</label>
                </div>
                <Link to={`/create-question`}>
                    <button type="button" className="mdc-button mdc-button--raised" onClick={this.submit.bind(this)}>
                        Mettre à jour
                    </button>
                </Link>

            </div>

        );
    }
}

export default modifySurvey