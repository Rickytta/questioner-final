import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
  expect
} = chai;

chai.use(chaiHttp);
/* Sign-up */
describe('Sign-up', () => {
  describe('POST /api/v1/auth/signup', () => {
    // test 1
    it('should return the information of the created user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Copain',
          lastName: 'Fabrice',
          otherName: 'Fabrice',
          email: 'fabrice@gmail.com',
          phone: '0789109908',
          username: 'copain',
          password: 'copain2018',
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
          firstName: 'Copain',
          lastName: 'Fabrice',
          otherName: 'Fabrice',
          email: 'fabricegmail.com',
          phone: '0789109908',
          username: 'copain',
          password: 'copain2018',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error.toLowerCase()).to.be.equal('please enter a valid email address');
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
          username: 'copain',
          password: 'copain2018',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    });
    // test 2
    it('should display \'Please enter valid characters! Only alphabetic characters allowed.\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'copain',
          password: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error.toLowerCase()).to.be.equal('user not found!');
          done();
        });
    });
  });
});