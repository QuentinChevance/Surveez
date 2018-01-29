import React, { Component } from 'react';
import RegistrationForm from './registrationForm';
import LoginForm from './loginForm';

class authentication extends Component{
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login
        };
    }

    showForm = () => {
        this.setState({login:!this.state.login});
    };

    render(){
        if(this.state.login === false){
            return(
                <div className="container container--center home">
                    <div className="card">
                        <h2 className="mdc-typography--display3">Surveez</h2>

                        <nav id="basic-tab-bar" className="mdc-tab-bar">
                            <a className="mdc-tab mdc-tab--active" onClick={this.showForm}>Inscription</a>
                            <a className="mdc-tab" name="login" onClick={this.showForm}>Connexion</a>
                            <span className="mdc-tab-bar__indicator"/>
                        </nav>

                        <RegistrationForm/>
                    </div>

                </div>
            );
        }else{
            return(
                <div className="container container--center home">

              <div className="card">
                <h2 className="mdc-typography--display3">Surveez</h2>

                <nav id="basic-tab-bar" className="mdc-tab-bar">
                    <a className="mdc-tab" onClick={this.showForm}>Inscription</a>
                    <a className="mdc-tab mdc-tab--active" name="login" onClick={this.showForm}>Connexion</a>
                    <span className="mdc-tab-bar__indicator"/>
                </nav>
                <LoginForm/>
              </div>
            </div>
            );
        }


    }
}
export default authentication