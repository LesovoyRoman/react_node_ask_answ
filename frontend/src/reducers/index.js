
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer'

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    questions: questionsReducer
});