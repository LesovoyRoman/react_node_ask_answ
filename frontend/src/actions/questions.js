
import axios from 'axios';
import {GET_ERRORS, SET_QUESTIONS} from "./types";
import {Path_port} from '../App'

export const createQuestion = (question, user_id) => dispatch => {
    return axios.post(Path_port + '/api/questions/create_question', {
        question: question,
        user_id: user_id
    })
        .then(res => {
            return res()
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}

export const updateQuestion = (question) => dispatch => {
    return axios.post(Path_port + '/api/questions/update_question', {
        description: question.description,
        id: question._id
    })
        .then(res => {
            return res()
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
}

export const getQuestions = dispatch => {
    return axios.post(Path_port + '/api/questions/all')
        .then(res => {
            return dispatch(setQuestions(res.data.questions))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setQuestions = questions => {
    return {
        type: SET_QUESTIONS,
        payload: questions
    }
}