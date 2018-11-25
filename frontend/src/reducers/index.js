
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer'
import answerReducer from './answersReducer'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    questions: questionsReducer,
    answer: answerReducer
});