import React, {Component} from "react";

import './Header.css';
import Authentication from "../forms/authentication";
import CreateSurvey from "../forms/createSurvey";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class Header extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <header className="Navbar">
                        <h1 className="Navbar-logo">Surveez</h1>
                        <nav>
                            <ul>
                                <li>
                                    <ul className="Navbar-bloc">
                                        <li className="Navbar-item">
                                            <Link to="/" className="Navbar-link Navbar-link--primary">Tableau de bord</Link>
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
                        <button className="mdc-button Navbar-button">Se déconnecter</button>
                    </header>
                    <Route exact path="/create-survey" component={CreateSurvey}/>
                </div>
            </Router>

        );
    }
}