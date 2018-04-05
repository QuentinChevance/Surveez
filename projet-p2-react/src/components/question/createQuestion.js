import React, { Component } from 'react';
import mdcAutoInit from "@material/auto-init/index";
import { MDCTextField } from "@material/textfield/index";
import FreeTextQuestion from "../question/freeTextQuestion";

class createQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            currentType: 0,
            freeQuestion: false

        }

    }
    componentDidMount() {
        mdcAutoInit.register("MDCTextField", MDCTextField);
        mdcAutoInit();
    }

    onStateChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    };

    displayErr(msgErr, para, target) {
        if (!target.nextElementSibling.classList.contains("customError")) {
            target.nextElementSibling.innerHTML = msgErr;
            target.nextElementSibling.classList.add("customError")
        }
    };


    handleChange(e) {
        this.setState({ currentType: e.target.options[e.target.options.selectedIndex].value });
        if (parseInt(e.target.options[e.target.options.selectedIndex].value,10) === 1) {
            this.setState({ freeQuestion: true });
        } else {
            this.setState({ freeQuestion: false });
        }
    }
    // Draw
    render() {
        return (
            <div className="container container--center home">
                <div className="card" id="createQuestionForm" style={{ marginTop: '25px' }}>
                    <select value={this.state.selectValue} onChange={this.handleChange.bind(this)} name="nom" size="1">
                        <option value='0'>Choisissez votre type de question</option>
                        <option value='1'>Question avec réponse en texte libre</option>
                        <option value='2'>Question avec réponse à choix unique</option>
                    </select>
                    {
                        this.state.freeQuestion
                            ? (<FreeTextQuestion />)
                            : ""
                    }
                </div>
                <div>

                </div>
            </div>
        );
    }
};
export default createQuestion;