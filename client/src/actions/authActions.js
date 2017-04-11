import AuthApi from '../api/authApi';

export function createUserSuccess(user) {
  return { type: 'CREATE_USER_SUCCESS', user };
}

export function createUser(user) {
  return function (dispatch) {
    return AuthApi.SignUpUser(user).then((responseUser) => {
      dispatch(createUserSuccess(responseUser));
    }).catch((error) => { throw (error); });
  };
}

export function loginUserSuccess(user) {
  return { type: 'LOGIN_USER_SUCCESS', user };
}

export function loginUser(user) {
  return function (dispatch) {
    return AuthApi.LoginUser(user).then((res) => {
      window.localStorage.setItem('token', res.body.Token);
      dispatch(loginUserSuccess(res));
    }).catch((error) => { throw (error); });
  };
}

