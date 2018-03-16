import React, { Component } from 'react';
import '../node_modules/material-components-web/dist/material-components-web';

import Authentication from "./components/forms/authentication";
import Dashboard from "./components/Dashboard/dashboard";

import './App.css';
import {Header} from "./components/Header/Header";

class App extends React.Component {
    constructor(props){

        super(props);
        localStorage.setItem("isLoggedIn","false");
    }

    componentWillReceiveProps(){
        this.forceUpdate();
    }

    render() {
        return <div>
            {localStorage.getItem("isLoggedIn") === "true" ? <Header/> : <Authentication/>}
            {localStorage.getItem("isLoggedIn") === "true" ? <Dashboard/> : ""}

        </div>;
    }
}

export default App;
