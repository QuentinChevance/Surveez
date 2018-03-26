import React, {Component} from "react";

import './Header.css';
import Authentication from "../forms/authentication";
import CreateSurvey from "../forms/createSurvey";
import freeTextQuestion from "../question/freeTextQuestion";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Dashboard } from "../Dashboard/dashboard";

export class Header extends Component {
    constructor(props){
        super(props);
        console.log("headerprops: ",this.props);
    }
    disconnectUser() {
        this.props.disconnect();
    }
    render() {
        return (
            <Router>
                <div>
                    <header className="Navbar">
                        <h1 className="Navbar-logo"><img src="/Surveez.svg" alt=""/></h1>
                        <nav>
                            <ul>
                                <li>
                                    <ul className="Navbar-bloc">
                                        <li className="Navbar-item">
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
                        <button className="mdc-button" onClick={this.disconnectUser.bind(this)}>Se déconnecter</button>
                    </header>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/create-survey" component={CreateSurvey}/>
                    <Route exact path="/create-question" component={freeTextQuestion}/>
                </div>
            </Router>

        );
    }
}