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
          username: 'copain2018',
          password: 'copain2018',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(res.body.data).length).to.be.above(0);
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
          userName: 'copain2018',
          password: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});