import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { createQuestion } from "../../actions/questions";

class CreateQuestion extends Component {
    constructor(){
        super()

        this.state = {
            new_question: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const new_question = {
            question: this.state.new_question
        }
        this.props.createQuestion(new_question);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login')
        }
    }

    render(){

        const createQuestion = (
            <div className="container">
                <h2 style={{ marginBottom: '40px' }}>Create Question</h2>
                <div className="row">
                    <div className="jumbotron col-12">
                        <form onSubmit={ this.handleSubmit }>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="lead input-group-text"
                                    placeholder={'Question goes here'}
                                    value={ this.state.new_question }
                                    name="new_question"
                                    onChange={this.handleInputChange}>
                                </input>
                            </div>
                            <hr className="my-4" />
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )

        return (
            createQuestion
        )
    }
}

CreateQuestion.propTypes = {
    createQuestion: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { createQuestion })(withRouter(CreateQuestion))