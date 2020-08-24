import {combineReducers} from 'redux';
import {user, errors} from './user';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    user,
    errors,
    form: formReducer
})