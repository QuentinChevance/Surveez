import React, { Component } from 'react';
import '../node_modules/material-components-web/dist/material-components-web';

import RegistrationForm from "./components/forms/registrationForm";

import './App.css';

class App extends React.Component {
    render() {
        return (
            <RegistrationForm />
        );
    }
}

export default App;
