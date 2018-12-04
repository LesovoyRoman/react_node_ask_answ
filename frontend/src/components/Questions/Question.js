import React, {Component} from 'react';
import classnames from 'classnames';
import { setAnswer, getAnswersQuestion } from './../../actions/answers'
import store from '../../store'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userInfoData } from './../../helpers/renderInfo'
import { updateQuestion } from './../../actions/questions'
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
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    }

    handleInputQuestionUpdate = (e) => {
        let question = this.state.question;
        question.description = e.target.value;
        this.setState({
            question: question
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitAnswer = (e) => {
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

    handleSubmitUpdate = (e) => {
        e.preventDefault();
        let question = this.state.question;

        store.dispatch(updateQuestion(question));
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

    renderAnswers(){
        return (
            <div>
                <p>Answers:</p>
                {
                    this.state.answers.map((answer, id) => (
                        <p className="lead" key={`answer${id}`}>{answer.description} { userInfoData(answer, this.props.auth.user) }</p>
                    ))
                }
            </div>
        )
    }

    updateQuestion() {

        if(this.state.question === null) return <p>Loading...</p>;

        if(this.props.auth.isAuthenticated && this.props.auth.user.id === this.state.question.user_id) return (
            <div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Question"
                        className={classnames('form-control form-control-lg')}
                        name="question"
                        onChange={ this.handleInputQuestionUpdate }
                        value={ this.state.question.description }
                    />
                </div>

                <button className={classnames('btn btn-info')} onClick={ this.handleSubmitUpdate }>save</button>
            </div>
        )

        return (
            <div>
                <p className="lead">{this.state.question.description}</p>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <h2 style={{ marginBottom: '40px' }}>Question</h2>
                <div className="row">
                    <div className="jumbotron col-12">

                        { this.updateQuestion() }

                        <hr className="my-4" />
                        { this.state.answers.length > 0 ? this.renderAnswers() : <div><span>No answers yet</span></div>}
                    </div>
                </div>
                <div className="row">
                    <div className="jumbotron col-12">
                        <form onSubmit={ this.handleSubmitAnswer }>
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