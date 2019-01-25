import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models/db';
import app from '../app';

const {
  expect
} = chai;

chai.use(chaiHttp);
/* Sign-up */
describe('Sign-up', () => {
  // clear users table
  before(async () => {
    try {
      await db.query('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('POST /api/v1/auth/signup', () => {
    // test 1
    it('should return the information of the created user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Jonathan',
          lastName: 'Rwabahizi',
          otherName: 'RJ',
          email: 'jonathanrwabahizi@gmail.com',
          phone: '+250781146646',
          username: 'rwajon',
          password: '12345',
          isAdmin: true
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    });
    // test 2
    it('should display \'Please enter a valid email address.\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Jonathan',
          lastName: 'Rwabahizi',
          otherName: 'RJ',
          email: 'jonathanrwabahizi-gmail.com',
          phone: '+250781146646',
          username: 'rwajon',
          password: '12345',
          isAdmin: true
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error.toLowerCase()).to.be.equal('please enter a valid email address');
          done();
        });
    });
    // test 3
    it('should display \'Sorry, this account already exists\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Jonathan',
          lastName: 'Rwabahizi',
          otherName: 'RJ',
          email: 'jonathanrwabahizi@gmail.com',
          phone: '+250781146646',
          username: 'rwajon',
          password: '12345',
          isAdmin: true
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.error.toLowerCase()).to.be.equal('sorry, this account already exists');
          done();
        });
    });
  });
});
/* Sign-in */
describe('Sign-in', () => {
  describe('POST /api/v1/auth/login', () => {
    // test 1
    it('should return the user information if the account exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'jonathanrwabahizi@gmail.com',
          password: '12345',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    });
    // test 2
    it('should display \'Please enter a valid email address.\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'jonathanrwabahizi-gmail.com',
          password: '12345',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error.toLowerCase()).to.be.equal('please enter a valid email address');
          done();
        });
    });
    // test 2
    it('should display \'Sorry, your username or password is incorrect\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'jonathanrwabahizi@gmail.com',
          password: '11111',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error.toLowerCase()).to.be.equal('sorry, your username or password is incorrect');
          done();
        });
    });
  });
});