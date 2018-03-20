import React, { Component } from 'react';
import axios from "axios/index";
import './dashboard.css';

class dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            publishDate: this.props.publishDate,
            surveys:[]
        };
    }
    // axios({ method: 'POST', url: 'you http api here', headers: {autorizacion: localStorage.token}
    componentDidMount() {
        axios.get('http://localhost:4000/survey',
            {
                headers: {
                    'Authorization': '8dbGg7S8b-oUKjnXPuQG',
                },
                params: {
                    user_id: 2
                }
            })
            .then((response) => {
                const surveys = response.data;
                console.log(response.data);
                this.setState({surveys});
                })
    };


    render() {

        return  <div className="dashboard">
            <header className="dashboard-title"><h1>Tableau de bord</h1></header>
            <div className="content">
                <h2>Mes questionnaires</h2>
                <div className="surveys-list">
                    {this.state.surveys.map(survey => <div className="survey-item">
                        <p><span className="survey-title" key={survey.id}>{survey.title}</span> - Crée le : {survey.publishDate}</p>
                        <p>Nombre de réponses : <span className="nb-answers">0</span> - Modifié le : 01/12/2017</p>
                        <div className="icons-list">
                            <a href=""><i className="fa fa-pencil fa-2x" aria-hidden="true"/></a>
                            <a href=""><i className="fa fa-download fa-2x" aria-hidden="true"/></a>
                            <a href=""><i className="fa fa-check fa-2x" aria-hidden="true"/></a>
                        </div>
                    </div>)}

                </div>
            </div>
        </div>;
    }
}
export default dashboard