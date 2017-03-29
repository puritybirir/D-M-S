const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const roleHelper = require('./helpers/roleHelper');
const usersHelper = require('./helpers/userHelper');

const dummyRole = roleHelper.roleHelper;
const dummyUser = usersHelper.usersHelper;

const should = chai.should();
chai.use(chaiHttp);

describe('Roles', () => {
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
  describe('Role Creation', () => {
    it('should create a role on /api/roles POST', (done) => {
      chai.request(app)
      .post('/api/roles')
      .set('x-access-token', adminToken)
      .send({
        name: dummyRole[0].name
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('Role created succesfully');
        done();
      });
    });
    it('should create a role on /api/roles POST', (done) => {
      chai.request(app)
      .post('/api/roles')
      .set('x-access-token', adminToken)
      .send({
        name: dummyRole[0].name
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('Role created succesfully');
        done();
      });
    });
    it('should fail to create a role on /api/roles POST if token not present', (done) => {
      chai.request(app)
      .post('/api/roles')
      .send({
        name: dummyRole[0].name
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail to create a role on /api/roles POST if invalid token is present', (done) => {
      chai.request(app)
      .post('/api/roles')
       .set('x-access-token', 'wrong token')
      .send({
        name: dummyRole[0].name
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
    it('should fail to create a role on /api/roles POST if token is not of an admin', (done) => {
      chai.request(app)
      .post('/api/roles')
      .set('x-access-token', userToken)
       .send({
         name: dummyRole[0].name
       })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('You are not an admin');
        done();
      });
    });
  });
  describe('Find One Role', () => {
    it('should find one specific role on api/roles/:id GET', (done) => {
      chai.request(app)
      .get('/api/roles/3')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('should fail to find one specific role on api/roles/:id GET if wrong token is provided', (done) => {
      chai.request(app)
      .get('/api/roles/3')
      .set('x-access-token', 'wrong token')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
    it('should fail to find one specific role on api/roles/:id GET if token is provided', (done) => {
      chai.request(app)
      .get('/api/roles/3')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should not find a role that does not exist on api/roles/:id GET', (done) => {
      chai.request(app)
      .get('/api/roles/1000')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal('Role Not Found');
        done();
      });
    });
    it('should fail to create a role on api/roles/:id GET if token is not of an admin', (done) => {
      chai.request(app)
      .get('/api/roles/3')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('You are not an admin');
        done();
      });
    });
  });
  describe('Update Role', () => {
    it('should update a role on api/roles/:id PUT', (done) => {
      chai.request(app)
      .put('/api/roles/4')
      .set('x-access-token', adminToken)
      .send({
        name: 'dummyName'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.name.should.equal('dummyName');
        done();
      });
    });
    it('should fail to update a role on api/roles/:id PUT if wrong token is provided', (done) => {
      chai.request(app)
      .put('/api/roles/4')
      .set('x-access-token', 'wrong token')
      .send({
        name: 'dummyName'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
    it('should fail to update a role on api/roles/:id PUT if no token is provided', (done) => {
      chai.request(app)
      .put('/api/roles/4')
      .send({
        name: 'dummyName'
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail to update a role on api/roles/:id PUT if token is not of an admin', (done) => {
      chai.request(app)
      .put('/api/roles/4')
      .set('x-access-token', userToken)
      .send({
        name: 'dummyName'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('You are not an admin');
        done();
      });
    });
  });
  describe('List All Roles', () => {
    it('should list all roles on  api/roles GET', (done) => {
      chai.request(app)
      .get('/api/roles')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Listing all available roles');
        done();
      });
    });
    it('should fail to list all roles on  api/roles GET if wrong token is provided', (done) => {
      chai.request(app)
      .get('/api/roles')
      .set('x-access-token', 'wrong token')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
    it('should fail to list all roles on  api/roles GET if no token is provided', (done) => {
      chai.request(app)
      .get('/api/roles')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail to list all roles on aapi/roles GET if token is not of an admin', (done) => {
      chai.request(app)
      .get('/api/roles')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('You are not an admin');
        done();
      });
    });
  });
  describe('Delete Roles', () => {
    it('should delete a role on api/roles/:id DELETE', (done) => {
      chai.request(app)
      .delete('/api/roles/5')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Role deleted successfully');
        done();
      });
    });
    it('should fail to delete a role on api/roles/:id DELETE if invalid token is provided', (done) => {
      chai.request(app)
      .delete('/api/roles/5')
      .set('x-access-token', 'wrong token')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
    it('should fail to delete a role on api/roles/:id DELETE if no token is provided', (done) => {
      chai.request(app)
      .delete('/api/roles/5')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail to delete a role on api/roles/:id DELETE if token provided is not an admin', (done) => {
      chai.request(app)
      .delete('/api/roles/5')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('You are not an admin');
        done();
      });
    });
  });
});
