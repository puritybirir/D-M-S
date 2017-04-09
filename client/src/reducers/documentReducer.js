import { browserHistory } from 'react-router';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function documentReducer(state = initialState.documents, action) {
  console.log(action.document, 'ewjfqon');
  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return action.documents;
    case types.CREATE_DOCUMENT_SUCCESS:
      browserHistory.push(`/documents/${action.document.id}`);
      return Object.assign({}, action.document);
    default:
      return state;
  }
}
