import { combineReducers } from 'redux';
import documents from './documentReducer';
import users from './authReducer';

const rootReducer = combineReducers({
  documents,
  users
});

export default rootReducer;
