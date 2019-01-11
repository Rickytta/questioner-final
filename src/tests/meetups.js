import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('meetups', () => {
  describe('GET api/v1/meetups', () => {
    it('it should return an array of meetups', (done) => {
      chai.request(app).get('/api/v1/meetups').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.be.above(0);
        done();
      });
    });
  });
});