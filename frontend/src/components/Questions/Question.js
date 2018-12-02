import React, {Component} from 'react';
import classnames from 'classnames';
import { setAnswer, getAnswersQuestion } from './../../actions/answers'
import store from '../../store'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

class Question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: {},
            answers: [],
            answer: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let answer = {
            description: this.state.answer,
        }
        return this.props.setAnswer(
            answer.description,
            this.state.question._id,
            this.props.auth.user.id
        )
    }

    componentDidMount() {
        if(!this.props.location.state) return this.props.history.push('/');
        if(!this.props.auth.isAuthenticated) return this.props.history.push('/');

        let question = this.props.location.state;
        this.setState({
            question: question.question,
        });
        store.dispatch(getAnswersQuestion(this.props.location.state.question._id));
    }

    componentWillReceiveProps(prop){
        if(prop.errors) {
            this.setState({
                errors: prop.errors
            })
        }
        if(prop.answers) {
            let answers = prop.answers
            this.setState({
                answers: answers.answers,
                answer: ''
            })
        }
    }

    userInfoAnswer(answer){
        /**
         * old answers
         */
        if(answer.user) return (
            <span style={{float: 'right', fontSize: '12px'}}>by {answer.user[0].name}</span>
        )
        /**
         * new answer
         */
        return (
            <span style={{float: 'right', fontSize: '12px'}}>by {this.props.auth.user.name}</span>
        )
    }

    renderAnswers(){
        return (
            <div>
                <p>Answers:</p>
                {
                    this.state.answers.map((answer, id) => (
                        <p className="lead" key={`answer${id}`}>{answer.description} {this.userInfoAnswer(answer)} </p>
                    ))
                }
            </div>
        )
    }

    render() {
        const {question} = this.state;
        if (question === null) return <p>Loading...</p>;

        return (
            <div className="container">
                <h2 style={{ marginBottom: '40px' }}>Question</h2>
                <div className="row">
                    <div className="jumbotron col-12">
                        <h1 className="display-3">{question.title}</h1>
                        <p className="lead">{question.description}</p>
                        <hr className="my-4" />
                        { this.state.answers.length > 0 ? this.renderAnswers() : <div><span>No answers yet</span></div>}
                    </div>
                </div>
                <div className="row">
                    <div className="jumbotron col-12">
                        <form onSubmit={ this.handleSubmit }>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Answer the question"
                                    className={classnames('form-control form-control-lg')}
                                    name="answer"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.answer }
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">answer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Question.propTypes = {
    setAnswer: PropTypes.func.isRequired,
    answers: PropTypes.object
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
    answers: state.answers
});

export default connect(mapStateToProps, { setAnswer })(withRouter(Question));