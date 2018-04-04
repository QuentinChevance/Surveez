import React, { Component } from 'react';
import axios from "axios/index";



class AnswersSurvey extends Component {
    constructor(props) {
        super(props);
        console.log("survey props: ",props);
        this.state = {
            surveyUrl: this.props.match.params.url,
            questionsAndAnswers: {},
            ajaxDone: false,
            surveyTitle: ""
        };
    }


    componentDidMount(){
        console.log("heeeeeeeeeeeey");
        
        
    }
    // axios({ method: 'POST', url: 'you http api here', headers: {autorizacion: localStorage.token}
    componentWillMount() {
        console.log("surveyId: ",this.state.surveyId);
        axios.get("http://" + window.location.hostname + ":4000/answer",{
            params: {
                url: this.state.surveyUrl
            }
        }).then(response => {
            // this.setState({"user_id": response.data.id});
            console.log("reponses ", response);
            console.log("response.data.survey.id: ",response.data.survey.id);
            
            let questionsAndAnswers = this.state.questionsAndAnswers;
            for(let i = 0; i<response.data.questions.length;i++){
                questionsAndAnswers[i] = {
                    question: response.data.questions[i].title,
                    answers: []
                }
                for(let j = 0; j<response.data.reponses.length;j++){
                    if(response.data.questions[i].id === response.data.reponses[j].question_id){
                        console.log("c'est égal: ",response.data.questions[i].id,"answer: ",response.data.reponses[j].question_id);
                        questionsAndAnswers[i].answers.push(response.data.reponses[j].content);
                    }
                }
            }
            console.log("questionréponses: ",questionsAndAnswers);
           
            axios.get("http://" + window.location.hostname + ":4000/survey",{
                params: {
                    id: response.data.survey[0].id
                },
                headers: {
                    Authorization: localStorage.getItem("auth_token")
                }
            }).then(response => {
                console.log("survey response: ",response);
                this.setState({
                    surveyTitle:response.data.title,
                    questionsAndAnswers: questionsAndAnswers,
                    ajaxDone: true
                });
            });
        });
    }

    render() {
        return (
            <div>
                <div className="card">
                    <h1>{this.state.surveyTitle}</h1>
                {this.state.ajaxDone ? Object.keys(this.state.questionsAndAnswers).map((objectKey, index) =>
                    <div>
                        <h3>{this.state.questionsAndAnswers[index].question}</h3>
                        <ul class="mdc-list">
                        {this.state.questionsAndAnswers[index].answers.map(answer =>   <li class="mdc-list-item">{answer}</li>)}

</ul>
                    </div>
                    ): ""}
                </div>
            </div>
        );
    }
}

export default AnswersSurvey