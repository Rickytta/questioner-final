import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('questions', () => {
  /* Get all questions */
  describe('GET /api/v1/questions', () => {
    it('it should return an array of questions', (done) => {
      chai.request(app).get('/api/v1/questions').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.be.above(0);
        done();
      });
    }); // end of test
  });
});

/* Get a specific question */
describe('GET /api/v1/questions/:questionId', () => {
  it('it should get a specific question', (done) => {
    chai.request(app).get('/api/v1/questions/1').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(Object.keys(res.body.data).length).to.be.above(0);
      done();
    }); // end of test
  });
});

/* Create a question */
describe('POST /api/v1/meetups/:meetupid/questions', () => {
  it('it should create a question', (done) => {
    chai.request(app).post('/api/v1/meetups/:meetupid/questions').send({
        createdBy: 2,
        meetup: 2,
        title: "bootstrap",
        body: 'What is the best way to animate my site if no bootstrap is used ?',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(Object.keys(res.body.data).length).to.be.above(0);
        done();
      });
  }); // end of test
});

/* Delete a specific question */
describe('DELETE /api/v1/:questionId', () => {
  it('it should delete an existing question', (done) => {
    chai.request(app).delete('/api/v1/questions/2').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.data.toLowerCase()).to.be.equal('question deleted');
      done();
    });
  });
}); //end of test

/* Downvote a question*/
describe('PATCH /api/v1/questions/1/downvote', () => {
  it('it should downvote a question', (done) => {
    chai.request(app)
      .patch('/api/v1/questions/1/downvote')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
}); // end of test

/* upvote a question*/
describe('PATCH /api/v1/questions/1/upvote', () => {
  it('it should upvote a question', (done) => {
    chai.request(app)
      .patch('/api/v1/questions/1/upvote')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
}); // end of test