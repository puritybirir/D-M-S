import { combineReducers } from 'redux';
import documents from './documentReducer';

const rootReducer = combineReducers({
  documents
});

export default rootReducer;
