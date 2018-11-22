
import axios from 'axios';
import {GET_ERRORS, SET_QUESTIONS} from "./types";
import {Path_port} from '../App'

export const createQuestion = (new_question) => dispatch => {
    return axios.post(Path_port + '/api/questions/create_question', new_question)
        .then()
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const getQuestions = () => dispatch => {
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