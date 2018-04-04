import React, { Component } from 'react';
import axios from "axios/index";
import './dashboard.css';

import { Route, Link } from "react-router-dom";

export class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: this.props.user_id,
            surveys:[]
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
            this.getSurveys();
        });
    }

    getSurveys(){
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
            console.log(response.data);
            this.setState({surveys});
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
            this.getSurveys();
        })
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
                            <p>Url publique: {survey.url}</p>
                            <div className="icons-list">
                                <button><Link to={"modifySurvey/"+survey.url}><i className="fa fa-pencil fa-2x" aria-hidden="true"/></Link></button>
                                <button><i className="fa fa-download fa-2x" aria-hidden="true"/></button>
                                <button><i className="fa fa-check fa-2x" aria-hidden="true"/></button>
                                <button><i className="fa fa-trash fa-2x" aria-hidden="true" surveyId={survey.id} onClick={this.deleteSurvey.bind(this)}/></button>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>
        );
    }
}