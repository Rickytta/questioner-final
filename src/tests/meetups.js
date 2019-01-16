import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('meetups', () => {
  /* Get all meetups */
  describe('GET /api/v1/meetups', () => {
    it('it should return an array of meetups', (done) => {
      chai.request(app).get('/api/v1/meetups').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.be.above(0);
        done();
      });
    }); // end of test
  });

  /* Get upcoming meetups */
  describe('GET /api/v1/meetups', () => {
    it('it should return an array of upcoming meetups', (done) => {
      chai.request(app).get('/api/v1/meetups/upcoming').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.be.above(0);
        done();
      });
    }); // end of test
  });

  /* Get a specific meetup */
  describe('GET /api/v1/meetups/:meetupId', () => {
    it('it should get a specific meetup', (done) => {
      chai.request(app).get('/api/v1/meetups/1').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(Object.keys(res.body.data).length).to.be.above(0);
        done();
      }); // end of test
    });
  });

  /* Create a meetup */
  describe('POST /api/v1/meetups', () => {
    it('it should create a meetup', (done) => {
      chai.request(app).post('/api/v1/meetups').send({
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

  /* Delete a specific meetup */
  describe('DELETE /api/v1/:meetupId', () => {
    it('it should delete an existing meetup', (done) => {
      chai.request(app).delete('/api/v1/meetups/2').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.toLowerCase()).to.be.equal('meetup deleted');
        done();
      });
    });
  }); //end of test

  /* Create a reservation*/
  describe('POST /api/v1/meetups/:meetupId/rsvps', () => {
    it('it should CREATE a reservation for a specific meetup', (done) => {
      chai.request(app).post('/api/v1/meetups/1/rsvps').send({
          user: 2,
          response: "yes"
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(res.body.data).length).to.be.above(0);
          done();
        });
    }); // end of test
  });

});