
import {SET_QUESTIONS} from "../actions/types";

const initialState = {
    questions: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            // @todo nothing happens !
            console.log('reducer')
            return {
                ...state,
                questions: action.payload
            }
        default:
            return state;
    }
}