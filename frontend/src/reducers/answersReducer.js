import {SET_ANSWER} from "../actions/types";

const initialState = {
    answer: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ANSWER:
            return {
                ...state,
                answer: action.payload
            }
        default:
            return state;
    }
}