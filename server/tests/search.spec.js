const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const usersHelper = require('./helpers/userHelper');

const dummyUser = usersHelper.usersHelper;

const should = chai.should();
chai.use(chaiHttp);

describe('Search', () => {
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
  describe('Searches for a specific document', () => {
    it('should search for a document on GET /api/search/documents/?doctitle=q', (done) => {
      chai.request(app)
      .get('/api/search/documents/?doctitle=o')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Listing all the documents that match the search criteria');
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
  describe('Searches for users', () => {
    it('should assign page numbers if limit and offset are present on /api/users?limit=2&offset=1 GET', (done) => {
      chai.request(app)
      .get('/api/users?limit=2&offset=1')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Here are the users that match the set criteria');
        done();
      });
    });
    it('should fail if a token is not provided on /api/users?limit=2&offset=1 GET', (done) => {
      chai.request(app)
      .get('/api/users?limit=2&offset=1')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail if the token provided is incorrect on /api/users?limit=2&offset=1 GET', (done) => {
      chai.request(app)
      .get('/api/users?limit=2&offset=1')
      .set('x-access-token', 'userToken')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
  });
});
