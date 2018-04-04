import React, { Component } from 'react';
import axios from "axios/index";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './dashboard.css';

export class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: this.props.user_id,
            surveys:[],
            publicSurveys: [],
            users: []
        };
    }
    // axios({ method: 'POST', url: 'you http api here', headers: {autorizacion: localStorage.token}
    componentDidMount() {
        axios.get(`http://`+window.location.hostname+`:4000/session`,{
            headers: {
                Authorization: localStorage.getItem("auth_token")
            }
        }).then(response => {
            this.setState({"user_id": response.data.id});
            console.log("userid: ",this.state.user_id);
            this.getMySurveys();
            this.getPublicSurveys();
        });
    }

    componentWillMount(){
        axios.get("http://"+window.location.hostname+":4000/registration",{
            headers: {
                Authorization: localStorage.getItem("auth_token")
            }
        }).then(response => {
            this.setState({users: response.data});
        });
    }

    getMySurveys(){
        axios.get(`http://`+window.location.hostname+':4000/survey',
        {
            headers: {
                'Authorization': localStorage.getItem("auth_token"),
            },
            params: {
                user_id: this.state.user_id
            }
        })
        .then((response) => {
            const surveys = response.data;
            console.log("surveys:",response.data);
            this.setState({surveys});
        });
    }

    getPublicSurveys(){
        axios.get(`http://`+window.location.hostname+':4000/survey',
        {
            headers: {
                'Authorization': localStorage.getItem("auth_token"),
            }
        })
        .then((response) => {
            const data = response.data,
            publicSurveys = [];
            for(let i = 0;i <data.length; i++){
                if(!data[i].scope){
                    publicSurveys.push(data[i]);
                }
            }
            console.log("publicSurveys:",publicSurveys);
            this.setState({publicSurveys});
        });
    }

    displaySurveyDate(createdAt){
        let createdAd = new Date(createdAt),
            year = createdAd.getFullYear(),
            month = createdAd.getMonth()+1,
            dt = createdAd.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return dt+'/' + month + '/'+year;
    }

    deleteSurvey(e){
        axios.delete(`http://`+window.location.hostname+':4000/survey/'+e.target.getAttribute("surveyid"),
        {
            headers: {
                'Authorization': localStorage.getItem("auth_token"),
            }
        }).then(response => {
            this.getMySurveys();
        })
    }

    answerSurvey(survey){
        window.location = "http://"+window.location.hostname+":"+window.location.port+"/answer?url="+survey.url;
        console.log("survey: ",survey);
    }

    createdBy(survey){
        for(let i=0; i<this.state.users.length; i++){
            if(this.state.users[i].id === survey.user_id){
                console.log("we are here");
                return this.state.users[i].firstName + " " + this.state.users[i].lastName;
            }
        }
    }

    render() {
        return  (
            <div className="dashboard">
                <header className="dashboard-title"><h1>Tableau de bord</h1></header>
                <div className="content">
                    <h2>Mes questionnaires</h2>
                    <div className="surveys-list">
                        {this.state.surveys.map(survey => <div className="survey-item">
                            <p><span className="survey-title" key={survey.id}>{survey.title}</span> - Crée le : {this.displaySurveyDate(survey.created_at)}</p>
                            <p>Nombre de réponses : <span className="nb-answers">0</span> - Modifié le : {this.displaySurveyDate(survey.updated_at)}</p>
                            <p className="publicUrl">Url privée: <a href={window.location.origin + "/answer?url="+ survey.url}>{window.location.origin + "/answer?url="+ survey.url}</a></p>
                            <div className="icons-list">
                                <button title="Éditer"><i className="fa fa-pencil fa-2x" aria-hidden="true"/></button>
                                <button title="Réponses"><Link to={`/answers/${survey.id}`}><i className="fa fa-bar-chart fa-2x" aria-hidden="true"/></Link></button>
                                <button title="Publier"><i className="fa fa-check fa-2x" aria-hidden="true"/></button>
                                <button title="Supprimer"><i className="fa fa-trash fa-2x" aria-hidden="true" surveyId={survey.id} onClick={this.deleteSurvey.bind(this)}/></button>
                            </div>
                        </div>)}
                    </div>
                    <h2>Tous les questionnaires</h2>
                    <div className="surveys-list">
                        {this.state.publicSurveys.map(survey =>
                        <div className="survey-item publicSurvey" onClick={() => {this.answerSurvey(survey)}}>
                            <p><span className="survey-title" key={survey.id}>{survey.title}</span> - Crée par : <span className="createdBy">{this.createdBy(survey)}</span></p>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}