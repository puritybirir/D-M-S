const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const documentsHelper = require('./helpers/documentsHelper');
const usersHelper = require('./helpers/userHelper');

const dummyDocument = documentsHelper.documentsHelper;
const dummyUser = usersHelper.usersHelper;

const should = chai.should();
chai.use(chaiHttp);

describe('Documents', () => {
  let userToken;
  let adminToken;
  before((done) => {
    chai.request(app)
    .post('/api/users/login')
    .send({
      email: dummyUser[0].email,
      password: dummyUser[0].password
    })
    .end((err, res) => {
      userToken = res.body.Token;
    });
    chai.request(app)
    .post('/api/users/login')
    .send({
      email: dummyUser[1].email,
      password: dummyUser[1].password
    })
    .end((err, res) => {
      adminToken = res.body.Token;
      done();
    });
  });

  describe('Document Creation', () => {
    it('should create a document on /api/documents POST', (done) => {
      chai.request(app)
      .post('/api/documents')
      .set('x-access-token', userToken)
      .send({
        title: dummyDocument[0].title,
        content: dummyDocument[0].content,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('Document has been successfully created');
        done();
      });
    });
    it('should create a document on /api/documents POST', (done) => {
      chai.request(app)
      .post('/api/documents')
      .set('x-access-token', userToken)
      .send({
        title: dummyDocument[0].title,
        content: dummyDocument[0].content,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('Document has been successfully created');
        done();
      });
    });
    it('should fail to create a document on /api/documents POST if content or title are absent', (done) => {
      chai.request(app)
      .post('/api/documents')
      .set('x-access-token', userToken)
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('notNull Violation: title cannot be null,\nnotNull Violation: content cannot be null');
        done();
      });
    });
    it('should fail if a token is not provided on /api/documents POST', (done) => {
      chai.request(app)
      .post('/api/documents')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail if an invalid token is provided on /api/documents POST', (done) => {
      chai.request(app)
      .post('/api/documents')
      .set('x-access-token', 'wrong token')
      .end((err, res) => {
        res.should.have.status(401);
        (res.body.message).should.equal('Invalid token provided');
        done();
      });
    });
  });
  describe('List all documents', () => {
    it('should list all documents on /api/documents GET', (done) => {
      chai.request(app)
      .get('/api/documents')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Listing all available documents');
        done();
      });
    });
    it('should fail to list all documents on /api/documents GET if token not present', (done) => {
      chai.request(app)
      .get('/api/documents')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail to list all documents on /api/documents GET if wrong token is provided', (done) => {
      chai.request(app)
      .get('/api/documents')
      .set('x-access-token', 'wrong token')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
  });
  describe('Find one document', () => {
    it('should find one documents on /api/documents/:id GET', (done) => {
      chai.request(app)
      .get('/api/documents/1')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        should.exist(res.body);
        done();
      });
    });
    it('should only find documents that exist on /api/documents/:id GET', (done) => {
      chai.request(app)
      .get('/api/documents/1000')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal('Document Not Found');
        done();
      });
    });
    it('should fail to list all documents on /api/documents/:id GET if token not present', (done) => {
      chai.request(app)
      .get('/api/documents/1')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail to list all documents on /api/documents/:id GET if token is not provided', (done) => {
      chai.request(app)
      .get('/api/documents/1')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
  });
  describe('Searches for a specific document', () => {
    it('should search for a document on GET /api/search/documents/?doctitle=q', (done) => {
      chai.request(app)
      .get('/api/search/documents/?doctitle=o')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Listing all the users that match the search criteria');
        done();
      });
    });
    it('should fail if a token is not provided on GET /api/search/documents/?doctitle=q ', (done) => {
      chai.request(app)
      .get('/api/search/documents/?doctitle=o')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail if a wrong token is provided GET /api/search/documents/?doctitle=q ', (done) => {
      chai.request(app)
      .get('/api/search/documents/?doctitle=o')
      .set('x-access-token', 'wrong token')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
  });
  describe('Update document', () => {
    it('should update documents details on /api/users/id Update', (done) => {
      chai.request(app)
      .put('/api/users/1')
      .set('x-access-token', userToken)
      .send({
        firstName: 'Sloth',
        lastName: 'Flash',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.firstName.should.equal('Sloth');
        res.body.lastName.should.equal('Flash');
        done();
      });
    });
    it('should fail if a token is not provided on /api/users/id Update', (done) => {
      chai.request(app)
      .put('/api/users/1')
      .send({
        firstName: 'Sloth',
        lastName: 'Flash',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail if a wrong token is provided on /api/users/id Update', (done) => {
      chai.request(app)
      .put('/api/users/1')
      .set('x-access-token', 'wrong token')
      .send({
        firstName: 'Sloth',
        lastName: 'Flash',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
  });
  describe('Delete document', () => {
    it('should delete a user on /api/users/id Delete', (done) => {
      chai.request(app)
      .delete('/api/users/3')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('User deleted successfully.');
        done();
      });
    });
    it('should fail to delete a user on /api/users/id Delete if not an admin', (done) => {
      chai.request(app)
      .delete('/api/users/3')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('You are not an admin');
        done();
      });
    });
    it('should fail to delete a user if wrong token is provided on /api/users/id Delete', (done) => {
      chai.request(app)
      .delete('/api/users/3')
      .set('x-access-token', 'wrong adminToken')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
    it('should fail to delete a user if no token is provided on /api/users/id Delete', (done) => {
      chai.request(app)
      .delete('/api/users/3')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
  });
});
