import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Path_port} from "../../App";

const question_path = '/api/questions/';

class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: null,
        };
    }

    async componentDidMount() {
        const questions = (await axios.get(Path_port + question_path)).data;
        this.setState({
            questions,
        });
    }

    render(){
        return (
            <div className="container">
                <h2 style={{ marginBottom: '40px' }}>Questions</h2>
                <div className="row">
                    {this.state.questions === null && <p>Loading questions...</p>}
                    {
                        this.state.questions && this.state.questions.map(question => (
                            <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
                                <Link to={`/question/${question.id}`}>
                                    <div className="card text-white bg-info mb-3">
                                        <div className="card-header">Answers: {question.answers_count}</div>
                                        <div className="card-body">
                                            <h4 className="card-title">{question.title}</h4>
                                            <p className="card-text">{question.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Questions;