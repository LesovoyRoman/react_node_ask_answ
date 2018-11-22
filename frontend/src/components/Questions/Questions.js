import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { getQuestions } from "../../actions/questions";
import {Link} from 'react-router-dom';

class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: this.props.questions,
            errors: {}
        };
    }

    componentDidMount(){

    }

    componentWillReceiveProps(prop){
        if(prop.questions) {
            console.log('adad')
            this.setState({
                questions: prop.questions
            })
        }
        if(prop.errors) {
            this.setState({
                errors: prop.errors
            })
        }
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

Questions.propTypes = {
 //   questions: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    getQuestions: state.questions
})

export default connect(mapStateToProps, { getQuestions })(withRouter(Questions));