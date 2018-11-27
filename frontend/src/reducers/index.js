
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer'
import answersReducer from './answersReducer'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    questions: questionsReducer,
    answers: answersReducer
});