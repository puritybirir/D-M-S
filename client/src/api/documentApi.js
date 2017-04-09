import request from 'superagent';

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaGVuZGVvZUBleGFtcGxlLmNvbSIsInVzZXJJZCI6MTQsInJvbGVJZCI6IjIiLCJpYXQiOjE0OTE3MTM2NjUsImV4cCI6MTQ5MTcxNzI2NX0.bYRbfZXnX4pl3j2z-KsYm7Vf2bBzWI7Q_TCWMNekm0U';
class DocumentApi {
  static getAllDocuments() {
    return request
    .get('/api/documents')
    .set('x-access-token', userToken)
    .then(res => res.body.document)
    .catch(error => error);
  }

  static createDocument(docDetails) {
    console.log(docDetails, 'DETAILS');
    return request
    .post('/api/documents')
    .set('x-access-token', userToken)
    .send(docDetails)
    .then(res => res.body.document)
    .catch(error => error);
  }
}

export default DocumentApi;
