const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const usersHelper = require('./helpers/userHelper');

const dummyUser = usersHelper.usersHelper;

const should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
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

  describe('User Creation and Login', () => {
    it('should create a user on /api/users POST', (done) => {
      chai.request(app)
      .post('/api/users')
      .send({
        firstName: dummyUser[3].firstName,
        lastName: dummyUser[3].lastName,
        userName: dummyUser[3].userName,
        email: dummyUser[3].email,
        password: dummyUser[3].password
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.message.should.equal('User created succesfully');
        res.body.user.firstName.should.equal(dummyUser[3].firstName);
        done();
      });
    });
    it('should create a unique user on /api/users POST', (done) => {
      chai.request(app)
      .post('/api/users')
      .send({
        firstName: dummyUser[1].firstName,
        lastName: dummyUser[1].lastName,
        userName: dummyUser[1].userName,
        email: dummyUser[1].email,
        password: dummyUser[1].password
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body[0].message.should.equal('email must be unique');
        done();
      });
    });
    it('should create a role for the user on /api/users POST', (done) => {
      chai.request(app)
      .post('/api/users')
      .send({
        firstName: dummyUser[2].firstName,
        lastName: dummyUser[2].lastName,
        userName: dummyUser[2].userName,
        email: dummyUser[2].email,
        password: dummyUser[2].password
      })
      .end((err, res) => {
        res.body.user.should.have.property('roleId');
        res.body.user.roleId.should.equal('1');
        done();
      });
    });
    it('should login an existing user on /api/users/login POST', (done) => {
      chai.request(app)
      .post('/api/users/login')
      .send({
        email: dummyUser[2].email,
        password: dummyUser[2].password
      })
      .end((err, res) => {
        res.body.message.should.equal('You have been logged in succesfully');
        res.body.email.should.equal(dummyUser[2].email);
        should.exist(res.body.Token);
        done();
      });
    });
    it('should provide a token on /api/users/login POST', (done) => {
      chai.request(app)
      .post('/api/users/login')
      .send({
        email: dummyUser[2].email,
        password: dummyUser[2].password
      })
      .end((err, res) => {
        should.exist(res.body.Token);
        done();
      });
    });
    it('should fail if the wrong login credentials are provided on /api/users/login POST ', (done) => {
      chai.request(app)
      .post('/api/users/login')
      .send({
        email: dummyUser[3].email,
        password: dummyUser[4].password
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Email/Password mismatch');
        done();
      });
    });
    it('should fail if the email provided is invalid on /api/users/login POST', (done) => {
      chai.request(app)
      .post('/api/users/login')
      .send({
        email: 'Invalid email'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('No email or password provided');
        done();
      });
    });
    it('should fail if the user has not been created on /api/users/login POST', (done) => {
      chai.request(app)
      .post('/api/users/login')
      .send({
        email: dummyUser[4].email,
        password: dummyUser[4].password
      })
      .end((err, res) => {
        res.body.message.should.equal('Unknown user');
        done();
      });
    });
    it('should fail if all fields are not provided on /api/users/login POST', (done) => {
      chai.request(app)
      .post('/api/users/login')
      .send({
        email: dummyUser[0].email,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('No email or password provided');
        done();
      });
    });
  });
  describe('Get all users', () => {
    it('should generate a list of all registered users on /api/users GET', (done) => {
      chai.request(app)
      .get('/api/users')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Listing all available users');
        done();
      });
    });
    it('should fail if a token is not provided on /api/users GET', (done) => {
      chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail if an invalid token is provided on /api/users GET', (done) => {
      chai.request(app)
      .get('/api/users')
      .set('x-access-token', 'wrong token')
      .end((err, res) => {
        res.should.have.status(401);
        (res.body.message).should.equal('Invalid token provided');
        done();
      });
    });
  });
  describe('Find one user', () => {
    it('should find a specific user in the application on /api/users/id GET', (done) => {
      chai.request(app)
      .get('/api/users/1')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        should.exist(res.body);
        done();
      });
    });
    it('should fail if a user does not exist on /api/users/id GET', (done) => {
      chai.request(app)
      .get('/api/users/20200')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(404);
        should.exist(res.body);
        done();
      });
    });
    it('should fail if a token is not provided on /api/users/id GET', (done) => {
      chai.request(app)
      .get('/api/users/1')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
  });
  describe('Update user', () => {
    it('should update a users details on /api/users/id PUT', (done) => {
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
    it('should fail to update a non-existing user on /api/users/id PUT', (done) => {
      chai.request(app)
      .put('/api/users/20200')
      .set('x-access-token', userToken)
      .send({
        firstName: 'Zootopia',
        lastName: 'Croods',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.equal('User Not Found');
        done();
      });
    });
    it('should fail if token is not provided on /api/users/unknownId PUT', (done) => {
      chai.request(app)
      .put('/api/users/1')
      .send({
        firstName: 'Kent',
        lastName: 'Beck',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail if invalid token is not provided on /api/users/id PUT', (done) => {
      chai.request(app)
      .put('/api/users/4')
      .set('x-access-token', 'invalid token provided')
      .send({
        firstName: 'Tj',
        lastName: 'Holowaychuck',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
  });
  describe('Delete user', () => {
    it('should delete a user on /api/users/id DELETE', (done) => {
      chai.request(app)
      .delete('/api/users/5')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('User deleted successfully.');
        done();
      });
    });
    it('should fail if an uncreated user is deleted on /api/users/unknownId DELETE ', (done) => {
      chai.request(app)
      .delete('/api/users/2000')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.equal('User does not exist');
        done();
      });
    });
    it('should fail if a token is not provided on /api/users/id DELETE', (done) => {
      chai.request(app)
      .delete('/api/users/1')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail if an invalid token is provided on /api/users/id DELETE', (done) => {
      chai.request(app)
      .delete('/api/users/1')
      .set('x-access-token', 'invalid userToken')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
  });
  describe('Search User', () => {
    it('should search for a user on /api/search/users?q=a GET', (done) => {
      chai.request(app)
      .get('/api/search/users?q=a')
      .set('x-access-token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal('Listing all the users that match the search criteria');
        done();
      });
    });
    it('should fail if a token is not provided on /api/search/users?q=a GET', (done) => {
      chai.request(app)
      .get('/api/search/users?q=a')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('No token provided');
        done();
      });
    });
    it('should fail if the token provided is incorrect on /api/search/users?q=a GET', (done) => {
      chai.request(app)
      .get('/api/search/users?q=a')
      .set('x-access-token', 'userToken')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal('Invalid token provided');
        done();
      });
    });
  });
});
