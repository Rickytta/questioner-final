import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models/db';
import app from '../app';

const {
  expect
} = chai;

chai.use(chaiHttp);
let token = '';

describe('questions', () => {
  // clear questions table
  before(async () => {
    try {
      await db.query('TRUNCATE meetups CASCADE; ALTER SEQUENCE meetups_id_seq RESTART WITH 1;');
      await db.query('TRUNCATE questions CASCADE; ALTER SEQUENCE questions_id_seq RESTART WITH 1;');
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

  /* Get a specific question */
  describe('GET /api/v1/questions/:questionId', () => {
    it('it should get a specific question', (done) => {
      chai.request(app)
        .get('/api/v1/questions/1')
        .set('access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        }); // end of test
    });
  });

  /* Downvote a question*/
  describe('PATCH /api/v1/questions/:questionId/downvote', () => {
    it('it should downvote a question', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/1/downvote')
        .set('access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  }); // end of test

  /* upvote a question*/
  describe('PATCH /api/v1/questions/:questionId/upvote', () => {
    it('it should upvote a question', (done) => {
      chai.request(app)
        .patch('/api/v1/questions/1/upvote')
        .set('access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  }); // end of test

  /* Create a comment*/
  describe('POST /api/v1/questions/:questionId/comments', () => {
    it('it should CREATE a comment for a specific question', (done) => {
      chai.request(app)
        .post('/api/v1/questions/1/comments')
        .set('access-token', token)
        .send({
          comment: 'This is a comment',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    }); // end of test
  });

  /* Get all comments*/
  describe('GET /api/v1/questions/:questionId/comments', () => {
    it('it should get all comments for a specific question', (done) => {
      chai.request(app)
        .get('/api/v1/questions/1/comments')
        .set('access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    }); // end of test
  });

  /* Delete a specific question */
  describe('DELETE /api/v1/:questionId', () => {
    it('it should delete an existing question', (done) => {
      chai.request(app)
        .delete('/api/v1/questions/1')
        .set('access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message.toLowerCase()).to.be.equal('question deleted');
          done();
        });
    });
  }); //end of test
});