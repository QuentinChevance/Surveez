import React, { Component } from 'react';
import axios from "axios/index";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //eslint-disable-line
import './dashboard.css';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            surveys: [],
            publicSurveys: [],
            users: [],
            surveysAnswers: {}
        };
    }
    componentDidMount() {
        axios.get(`http://` + window.location.hostname + `:4000/session`, {
            headers: {
                Authorization: localStorage.getItem("auth_token")
            }
        }).then(response => {
            this.setState({ "user_id": response.data.id });
            this.getMySurveys();
            this.getPublicSurveys();
        });
    }

    componentWillMount() {
        axios.get("http://" + window.location.hostname + ":4000/registration", {
            headers: {
                Authorization: localStorage.getItem("auth_token")
            }
        }).then(response => {
            this.setState({ users: response.data });
        });
    }

    getMySurveys() {
        axios.get(`http://` + window.location.hostname + ':4000/survey',
            {
                headers: {
                    'Authorization': localStorage.getItem("auth_token"),
                },
                params: {
                    user_id: this.state.user_id
                }
            })
            .then((response) => {
                const surveys = response.data,
                    surveysAnswers = {};

                for(let i = 0; i < surveys.length; i++){
                    axios.get(`http://` + window.location.hostname + ':4000/answer',
                        {
                            params: {
                                url: surveys[i].url
                            }
                        })
                        .then((response) => {
                            surveysAnswers[surveys[i].id] = response.data.reponses.length;
                            this.setState({surveysAnswers:surveysAnswers});
                        });
                }
                this.setState({ surveys });
            });
    }

    getPublicSurveys() {
        axios.get(`http://` + window.location.hostname + ':4000/survey',
            {
                headers: {
                    'Authorization': localStorage.getItem("auth_token"),
                }
            })
            .then((response) => {
                const data = response.data,
                    publicSurveys = [];
                for (let i = 0; i < data.length; i++) {
                    if (!data[i].scope) {
                        publicSurveys.push(data[i]);
                    }
                }
                this.setState({ publicSurveys });
            });
    }

    getNumberAnswers(surveyId) {
        let ret = 0,
            self = this;
        Object.keys(this.state.surveysAnswers).map(function(objectKey, index) {
            let key = parseInt(objectKey,10);
            console.log("objectkey: ",key," surveyid: ",surveyId);
            if(key === surveyId) {
                console.log("ret: ",self.state.surveysAnswers[objectKey]);
                ret = self.state.surveysAnswers[objectKey];
            }
        });
        return ret;
    }

    displaySurveyDate(createdAt) {
        let createdAd = new Date(createdAt),
            year = createdAd.getFullYear(),
            month = createdAd.getMonth() + 1,
            dt = createdAd.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return dt + '/' + month + '/' + year;
    }

    deleteSurvey(e) {
        axios.delete(`http://` + window.location.hostname + ':4000/survey/' + e.target.getAttribute("surveyid"),
            {
                headers: {
                    'Authorization': localStorage.getItem("auth_token"),
                }
            }).then(response => {
                this.getMySurveys();
            })
    }

    answerSurvey(survey) {
        window.location = "http://" + window.location.hostname + ":" + window.location.port + "/answer?url=" + survey.url;
    }

    createdBy(survey) {
        for (let i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i].id === survey.user_id) {
                return this.state.users[i].firstName + " " + this.state.users[i].lastName;
            }
        }
    }

    render() {
        return (
            <div className="dashboard">
                <header className="dashboard-title"><h1>Tableau de bord</h1></header>
                <div className="content">
                    <h2>Mes questionnaires</h2>
                    <div className="surveys-list">
                        {this.state.surveys.map(survey => <div className="survey-item">
                            <p><span className="survey-title">{survey.title}</span> - Crée le : {this.displaySurveyDate(survey.created_at)}</p>
                            <p>Nombre de réponses : <span className="nb-answers">{this.getNumberAnswers(survey.id)}</span> - Modifié le : {this.displaySurveyDate(survey.updated_at)}</p>
                            <p className="publicUrl">Url privée: <a href={window.location.origin + "/answer?url=" + survey.url}>{window.location.origin + "/answer?url=" + survey.url}</a></p>
                            <div className="icons-list">
                                <button title="Éditer"><Link to={"modifySurvey/" + survey.url}><i className="fa fa-pencil fa-2x" aria-hidden="true" /></Link></button>
                                <button title="Réponses"><Link to={`/answers/${survey.url}`}><i className="fa fa-bar-chart fa-2x" aria-hidden="true" /></Link></button>
                                <button title="Publier"><i className="fa fa-check fa-2x" aria-hidden="true" /></button>
                                <button title="Supprimer"><i className="fa fa-trash fa-2x" aria-hidden="true" surveyid={survey.id} onClick={this.deleteSurvey.bind(this)} /></button>
                            </div>
                        </div>)}
                    </div>
                    <h2>Tous les questionnaires</h2>
                    <div className="surveys-list">
                        {this.state.publicSurveys.map(survey =>
                            <div className="survey-item publicSurvey" onClick={() => { this.answerSurvey(survey) }}>
                                <p><span className="survey-title" key={survey.id}>{survey.title}</span> - Crée par : <span className="createdBy">{this.createdBy(survey)}</span></p>
                            </div>)}
                    </div>
                </div>
            </div>
        );
    }
}