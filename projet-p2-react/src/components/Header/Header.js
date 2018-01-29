import React, {Component} from "react";

import './Header.css';

export class Header extends React.Component {
    render() {
        return (
            <header className="Navbar">
                <h1 className="Navbar-logo">Surveez</h1>
                <nav>
                    <ul>
                        <li>
                            <ul className="Navbar-bloc">
                                <li className="Navbar-item">
                                    <a href="" className="Navbar-link Navbar-link--primary">Tableau de bord</a>
                                </li>
                                <li>
                                    <ul>
                                        <li className="Navbar-item"><a href="" className="Navbar-link Navbar-link--secondary">Créer un questionnaire</a></li>
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
        );
    }
}