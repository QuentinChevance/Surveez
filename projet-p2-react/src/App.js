import React, { Component } from 'react';
import '../node_modules/material-components-web/dist/material-components-web';

import RegistrationForm from "./components/forms/registrationForm";

import './App.css';
import {Header} from "./components/Header/Header";

class App extends React.Component {
    render() {
        return (
            <div>
            <RegistrationForm />
                <Header/>
            </div>
        );
    }
}

export default App;
