import React, { Component } from 'react';
import '../node_modules/material-components-web/dist/material-components-web';

import Authentication from "./components/forms/authentication";

import './App.css';
import {Header} from "./components/Header/Header";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn
        }
    }
    render() {
        return (
            <div>
                <Authentication />
                { localStorage.getItem("isLoggedIn") === "true"
                    ?(<Header/>)
                    : ""
                }
            </div>
        );
    }
}

export default App;
