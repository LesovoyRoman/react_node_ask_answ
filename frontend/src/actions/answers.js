import axios from 'axios';
import {GET_ERRORS, SET_ANSWER} from "./types";
import {Path_port} from '../App'

export const setAnswer = (answer) => dispatch => {
    return axios.post(Path_port + '/api/answers/setAnswer', answer)
        .then(res => {
            return dispatch(setAnswerReducer(res.data.answer))
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        })
}

export const setAnswerReducer = answer => {
    return {
        type: SET_ANSWER,
        payload: answer
    }
}