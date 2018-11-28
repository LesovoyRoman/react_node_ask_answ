import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { createQuestion } from "../../actions/questions";
import PropTypes from 'prop-types';

class CreateQuestion extends Component {
    constructor(props){
        super(props)

        this.state = {
            new_question: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createQuestion(this.state.new_question, this.props.auth.user.id).then(res => {
            this.props.history.push('/')
        }).catch(err => {
            console.log(err)
        });
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated) return this.props.history.push('/');
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillReceiveProps(prop){
        if(!prop.auth.isAuthenticated) {
            this.props.history.push('/');
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
})

export default connect(mapStateToProps, { createQuestion })(withRouter(CreateQuestion))