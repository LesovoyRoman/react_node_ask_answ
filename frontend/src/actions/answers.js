import axios from 'axios';
import {GET_ERRORS, SET_ANSWER, SET_ANSWERS_QUESTIONS} from "./types";
import {Path_port} from '../App'

export const setAnswer = ( description, question_id, user_id) => dispatch => {
    return axios.post(Path_port + '/api/answers/setAnswer',
        {
            description: description,
            question_id: question_id,
            user_id: user_id
        }).then(res => {
            return dispatch(setAnswerReducer(res.data.answer))
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        })
}

export const getAnswersQuestion = (question_id) => dispatch => {
    return axios.post(Path_port + '/api/answers/question', {
        question_id: question_id
    })
        .then(res => {
            return dispatch(getQuestionAnswers(res.data.answers))
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        })
}


/**
 * CONSTS TO CALL DISPATCHES
 */

export const setAnswerReducer = answer => {
    return {
        type: SET_ANSWER,
        payload: answer
    }
}

export const getQuestionAnswers = answers => {
    return {
        type: SET_ANSWERS_QUESTIONS,
        payload: answers
    }
}