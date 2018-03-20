import React, { Component } from 'react';
import '../node_modules/material-components-web/dist/material-components-web';

import Authentication from "./components/forms/authentication";
import axios from 'axios';
import './App.css';
import {Header} from "./components/Header/Header";
import {Dashboard} from "./components/Dashboard/dashboard";
import './components/Dashboard/dashboard.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isConnected : false
        }
        this.handler = this.handler.bind(this)
        localStorage.setItem("isLoggedIn","false");
    }

    checkConnection(){
        axios.get('http://localhost:4000/session',{
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
    }

    handler() {
        this.checkConnection();
        console.log("update");
    }

    disconnect = () => {
        localStorage.removeItem("auth_token");
        this.setState({"isConnected":false});
    }

    render() {
        return (
            <div>
                {                     
                    this.state.isConnected
                    ?([<Header disconnect={this.disconnect}/>,<Dashboard/>])
                    : (<Authentication handler={this.handler}/>)
                }
            </div>
        );
    }
}

export default App;
