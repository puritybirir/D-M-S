import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return Object.assign({}, action.user);
    case types.LOGIN_USER_SUCCESS:
      return Object.assign({}, action.user);
    default:
      return state;
  }
}
