import request from 'superagent';

class DocumentApi {
  static getAllDocuments() {
    return request
    .get('/api/documents')
    .set('x-access-token', window.localStorage.getItem('token'))
    .then(res => res.body.document)
    .catch(error => error);
  }

  static createDocument(docDetails) {
    return request
    .post('/api/documents')
    .set('x-access-token', window.localStorage.getItem('token'))
    .send(docDetails)
    .then(res => res.body.document)
    .catch(error => error);
  }
}

export default DocumentApi;
