import React, {Component} from "react";

import './Header.css';
import Authentication from "../forms/authentication";
import CreateSurvey from "../forms/createSurvey";
import createQuestion from "../question/createQuestion";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import { Dashboard } from "../Dashboard/dashboard";

export class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId : this.props.userId,
            userFirstName: this.props.userFirstName,
            userLastName: this.props.userLastName,
            userEmail: this.props.userEmail
        }
        console.log("headerprops: ",this.props);
    }
    disconnectUser() {
        this.props.disconnect();
    }
    componentWillMount(){
        axios.get("http://"+window.location.hostname+":4000/session",{
            headers: {
                Authorization: localStorage.getItem("auth_token")
            }
        }).then(response => {
            console.log("response: ",response);
            axios.get("http://"+window.location.hostname+":4000/registration?id="+response.data.id,{
                headers: {
                    Authorization: localStorage.getItem("auth_token")
                }
            }).then(response => {
                this.setState({
                    userId: response.data.id,
                    userFirstName: response.data.firstName,
                    userLastName: response.data.lastName,
                    userEmail: response.data.email
                })
                console.log("info user: ",response);
            })
            
        }).catch(error=>{
            console.error(error);
        })
    }

    checkUrl(){
        this.props.handler();
    }
    render() {
        return (
            <Router>
                <div>
                    <header className="Navbar">
                        <h1 className="Navbar-logo"><img src="/Surveez.svg" alt="Logo de l'application"/></h1>
                        <div className="user-infos">
                            <p className="user-name">{this.state.userFirstName} {this.state.userLastName}</p>
                            <p className="user-email">{this.state.userEmail}</p>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <ul className="Navbar-bloc">
                                        <li className="Navbar-item" onClick={this.checkUrl.bind(this)}>
                                            <Link to="/dashboard" className="Navbar-link Navbar-link--primary">Tableau de bord</Link>
                                        </li>
                                        <li>
                                            <ul>
                                                <li className="Navbar-item"><Link to="/create-survey"  className="Navbar-link Navbar-link--secondary">Créer un questionnaire</Link></li>
                                                
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li >
                                    <ul className="Navbar-bloc">
                                        <li className="Navbar-item">
                                            <a href="" className="Navbar-link Navbar-link--primary">Compte</a>
                                        </li>
                                        <li>
                                            <ul>
                                                <li className="Navbar-item"><a href="" className="Navbar-link Navbar-link--secondary">Abonnement</a></li>
                                                <li className="Navbar-item"><a href="" className="Navbar-link Navbar-link--secondary">Factures</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul  className="Navbar-bloc">
                                        <li className="Navbar-item">
                                            <a href="" className="Navbar-link Navbar-link--primary">Administration</a>
                                        </li>
                                        <li>
                                            <ul >
                                                <li className="Navbar-item"><a href="" className="Navbar-link Navbar-link--secondary">Gestion des revenus</a></li>
                                                <li className="Navbar-item"><a href="" className="Navbar-link Navbar-link--secondary">Liste des utilisateurs</a></li>
                                                <li className="Navbar-item"><a href="" className="Navbar-link Navbar-link--secondary">Système d'abonnement</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        <div className="disconnect">
                            <button className="mdc-button mdc-button--raised" onClick={this.disconnectUser.bind(this)}>Se déconnecter</button>
                        </div>
                    </header>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/create-survey" component={CreateSurvey}/>
                    <Route exact path="/create-question" component={createQuestion}/>
                </div>
            </Router>

        );
    }
}