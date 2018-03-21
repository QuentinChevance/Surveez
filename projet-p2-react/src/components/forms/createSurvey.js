import React, { Component } from 'react';
import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';
import axios from 'axios';
import App from "../../App";


class createSurvey extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            scope: false,
            user_id: this.props.user_id
        }
    }
    componentDidMount(){
        mdcAutoInit.register('MDCTextField', MDCTextField);
        mdcAutoInit();
    }

    onStateChange(event){
        this.setState({[event.target.id]:event.target.value});
    };

    onChangeCkBox(event){
        this.setState({[event.target.id]:event.target.checked});
    };

    submit(){
        console.log("scope: ",this.state.scope);
        axios.get(`http://localhost:4000/session`,{
            headers: {
                Authorization: localStorage.getItem("auth_token")
            }
        }).then(response => {
            this.setState({"user_id": response.data.id});
            console.log("userid: ",this.state.user_id);
            axios.post(
                `http://localhost:4000/survey`,
                {
                    title: this.state.title,
                    scope: this.state.scope,
                    typeSurvey: "sondage",
                    isActive: 0,
                    user_id: this.state.user_id
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("auth_token")
                    }
                }
            ).then(response => {
                // Update the local state with the received data after the PUT action (and set them as data is for index)
                console.log("response",response);
                console.log("app: ",App);
            }).catch(error => console.log(error))
        });
        
        
    };


    // Draw
    render() {
        return (
            <div className="card">
                <div className="mdc-text-field" data-mdc-auto-init="MDCTextField">
                    <input type="text" className="mdc-text-field__input" onChange={this.onStateChange.bind(this)} id="title"/>
                    <label htmlFor="title" className="mdc-text-field__label" >Titre </label>
                </div>

                <div className="mdc-form-field">
                    <div className="mdc-checkbox">
                        <input type="checkbox"
                               id="scope"
                               className="mdc-checkbox__native-control" checked={this.state.scope} onChange={this.onChangeCkBox.bind(this)}/>
                        <div className="mdc-checkbox__background">
                            <svg className="mdc-checkbox__checkmark"
                                 viewBox="0 0 24 24">
                                <path className="mdc-checkbox__checkmark-path"
                                      fill="none"
                                      stroke="white"
                                      d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                            </svg>
                            <div className="mdc-checkbox__mixedmark"></div>
                        </div>
                    </div>

                    <label htmlFor="scope">Privé</label>
                </div>
                <button type="button" className="mdc-button mdc-button--raised" onClick={this.submit.bind(this)}>
                    Créer
                </button>
            </div>

        );
    }
}

export default createSurvey