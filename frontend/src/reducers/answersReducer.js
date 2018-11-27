import {SET_ANSWER, SET_ANSWERS_QUESTIONS} from "../actions/types";

const initialState = {
    answers: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ANSWER:
            let updated_data = [];
            updated_data = state.answers;
            updated_data.push(action.payload);
            return {
                ...state,
                answers: updated_data
            }
        case SET_ANSWERS_QUESTIONS:
            return {
                ...state,
                answers: action.payload
            }
        default:
            return state;
    }
}