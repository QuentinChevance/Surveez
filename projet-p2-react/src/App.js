import React, { Component } from 'react';
import '../node_modules/material-components-web/dist/material-components-web.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import Authentication from "./components/forms/authentication";
import axios from 'axios';
import './App.css';
import {Header} from "./components/Header/Header";
import {Dashboard} from "./components/Dashboard/dashboard";
import './components/Dashboard/dashboard.css';
import { AnswerSurvey } from './components/Answer/answer_survey';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isConnected : false,
            displaySurvey: false
        }
        this.handler = this.handler.bind(this)
        localStorage.setItem("isLoggedIn","false");
    }

    checkConnection(){
        axios.get('http://'+window.location.hostname+':4000/session',{
            headers: {
                Authorization: localStorage.getItem("auth_token")
            }

        }).then(response => {
            if(response.status === 200){
                this.setState({"isConnected":true});
            }
        })
    }

    componentWillMount(){
        this.checkConnection();
        this.checkAnswerUrl();
    }

    handler() {
        this.checkConnection();
        this.checkAnswerUrl();
        console.log("update");
    }

    disconnect (){
        localStorage.removeItem("auth_token");
        this.setState({"isConnected":false});
    }

    checkAnswerUrl(){
        if(window.location.pathname === "/answer" && window.location.search.match(/\?url=.*/)){
            this.setState({displaySurvey:true});
            console.log("displaySurvey: ",this.state.displaySurvey);
        } else {
            this.setState({displaySurvey:false});

        }
    }

    render() {
        console.log("displaySurvey2: ",this.state.displaySurvey);
        return (
            <div>
                {                     
                    this.state.isConnected
                    ? (<Header disconnect={this.disconnect.bind(this)} handler={this.handler}/>)
                    : ""
                }
                {
                    this.state.displaySurvey
                    ? (<AnswerSurvey/>)
                    : ""
                }
                {                     
                    !this.state.isConnected && !this.state.displaySurvey
                    ? (<Authentication handler={this.handler}/>)
                    : ""
                }
            </div>
        );
    }
}

export default App;
