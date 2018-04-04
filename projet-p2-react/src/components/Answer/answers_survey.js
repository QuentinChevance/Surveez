import React, { Component } from 'react';
import axios from "axios/index";

export class AnswersSurvey extends Component {
    constructor(props) {
        super(props);
        console.log("survey props: ",props);
        // this.state = {
        //     surveyId: this.props.match.surveyid
        // };
    }


    componentDidMount(){
        console.log("heeeeeeeeeeeey");
        
        
    }
    // axios({ method: 'POST', url: 'you http api here', headers: {autorizacion: localStorage.token}
    // componentWillMount() {
    //     axios.get("http://" + window.location.hostname + ":4000/answer",{
    //         params: {
    //             id: this.state.surveyId
    //         }
    //     }).then(response => {
    //         // this.setState({"user_id": response.data.id});
    //         console.log("reponses ", response);
    //     });
    // }

    render() {
        return (
            <div>
                BONJOUR
            </div>
        );
    }
}