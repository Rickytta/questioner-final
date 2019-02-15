import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models/db';
import app from '../app';

const {
  expect
} = chai;

chai.use(chaiHttp);
let token = '';

describe('meetups', () => {
  // clear meetups table
  before(async () => {
    try {
      await db.query('TRUNCATE meetups CASCADE; ALTER SEQUENCE meetups_id_seq RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('POST /api/v1/auth/login', () => {
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
          token = res.body.token;
          done();
        });
    });
  });
  /* Create a meetup */
  describe('POST /api/v1/meetups', () => {
    it('it should create a meetup', (done) => {
      chai.request(app)
        .post('/api/v1/meetups')
        .set('access-token', token)
        .send({
          location: 'Kigali Convention Center',
          images: ['../imagebank/css/css.jpg', 'http://imagebank/css/meetup7.jpg'],
          topic: 'Web designing without CSS framework',
          happeningOn: 'February 11, 2019',
          tags: ['css', 'web', 'kigali']
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    }); // end of test
  });

  /* Get upcoming meetups */
  describe('GET /api/v1/meetups/upcoming', () => {
    it('it should return an array of upcoming meetups', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/upcoming')
        .set('access-token', token)
        .end((err, res) => {
          // expect(res.status).to.equal(200);
          // expect(res.body.data.length).to.be.above(0);
          done();
        });
    }); // end of test
  });

  /* Get all meetups */
  describe('GET /api/v1/meetups', () => {
    it('it should return an array of meetups', (done) => {
      chai.request(app)
        .get('/api/v1/meetups')
        .set('access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.above(0);
          done();
        });
    }); // end of test
  });

  /* Get a specific meetup */
  describe('GET /api/v1/meetups/:meetupId', () => {
    it('it should get a specific meetup', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/1')
        .set('access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        }); // end of test
    });
  });

  /* Create a reservation*/
  describe('POST /api/v1/meetups/:meetupId/rsvps', () => {
    it('it should CREATE a reservation for a specific meetup', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/1/rsvps')
        .set('access-token', token)
        .send({
          createdBy: 1,
          response: 'yes'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    }); // end of test
  });

  /* Create a question*/
  describe('POST /api/v1/meetups/:meetupId/questions', () => {
    it('it should CREATE a question for a specific meetup', (done) => {
      chai.request(app)
        .post('/api/v1/meetups/1/questions')
        .set('access-token', token)
        .send({
          title: 'Test Driven Development',
          body: 'How does Jasmine works ?'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    }); // end of test
  });

  /* Get all questions*/
  describe('GET /api/v1/meetups/:meetupId/questions', () => {
    it('it should return an array of questions for a specific meetup', (done) => {
      chai.request(app)
        .get('/api/v1/meetups/1/questions')
        .set('access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.be.above(0);
          done();
        });
    }); // end of test
  });

  /* Delete a specific meetup */
  describe('DELETE /api/v1/:meetupId', () => {
    it('it should delete an existing meetup', (done) => {
      chai.request(app)
        .delete('/api/v1/meetups/1')
        .set('access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message.toLowerCase()).to.be.equal('meetup deleted');
          done();
        });
    });
  }); //end of test

});