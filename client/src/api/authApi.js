import request from 'superagent';

class AuthApi {
  static SignUpUser(userDetails) {
    return request
    .post('/api/users')
    .send(userDetails)
    .then(res => res.body.user)
    .catch(error => error);
  }
  static LoginUser(userDetails) {
    return request
    .post('/api/users/login')
    .send(userDetails)
    .then(res => res)
    .catch(error => error);
  }
}

export default AuthApi;
