import Validate from '../helpers/validate';
import db from '../models/db'

class Meetup {
  /* Checking if the Meetup exixts */
  static checkMeetup(meetupId) {
    let checkMeetup = {};
    for (const key in meetups) {
      if (meetups[key].id === meetupId) {
        checkMeetup = meetups[key];
        checkMeetup.createdOn = new Date(checkMeetup.createdOn).toDateString();
        checkMeetup.happeningOn = new Date(checkMeetup.happeningOn).toDateString();
        break;
      }
    }

    return checkMeetup;
  }
  /* create */
  static async create(req, res) {
    // Validate inputs
    let checkInputs = [];
    checkInputs.push(Validate.title(req.body.location, true));
    checkInputs.push(Validate.title(req.body.topic, true));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }

    const text = `INSERT INTO
      meetups(location, images, topic, "happeningOn", tags)
      VALUES($1, $2, $3, $4, $5) RETURNING *`;

    const values = [
      req.body.location,
      req.body.images,
      req.body.topic,
      new Date(req.body.happeningOn),
      req.body.tags
    ];

    try {
      const checkMeetup = await db.query('SELECT * FROM meetups WHERE location=$1 AND topic=$2 AND "happeningOn"=$3', [req.body.location, req.body.topic, new Date(req.body.happeningOn)]);

      if (checkMeetup.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          error: 'Sorry, this meetup already exists',
        });
      }

      const {
        rows
      } = await db.query(text, values);

      if (rows.length > 0) {
        rows[0].createdOn = new Date(rows[0].createdOn).toDateString();
        rows[0].happeningOn = new Date(rows[0].happeningOn).toDateString();

        return res.status(201).json({
          status: 201,
          data: rows[0],
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'Meetup not created!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* get all meetups */
  static async getAllMeetups(req, res) {
    try {
      const {
        rows
      } = await db.query('SELECT * FROM meetups');
      if (rows.length > 0) {
        let meetups = [];
        rows.forEach(meetup => {
          meetup.createdOn = new Date(meetup.createdOn).toDateString();
          meetup.happeningOn = new Date(meetup.happeningOn).toDateString();
          meetups.push(meetup);
        });
        return res.status(200).json({
          status: 200,
          data: meetups,
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Meetups not found!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* get by id */
  static async getMeetup(req, res) {
    try {
      const {
        rows
      } = await db.query('SELECT * FROM meetups WHERE id=$1', [req.params.meetupId]);
      if (rows.length > 0) {
        rows[0].createdOn = new Date(rows[0].createdOn).toDateString();
        rows[0].happeningOn = new Date(rows[0].happeningOn).toDateString();

        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Meetup not found!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* get upcoming meetups */
  static getUpcomingMeetups(req, res) {
    const upcomingMeetups = [];

    for (let key in meetups) {
      if (Date.now() < meetups[key].happeningOn) {
        meetups[key].createdOn = new Date(meetups[key].createdOn).toDateString();
        meetups[key].happeningOn = new Date(meetups[key].happeningOn).toDateString();
        upcomingMeetups.push(meetups[key]);
      }
    }

    if (Object.keys(upcomingMeetups).length > 0) {
      return res.status(200).json({
        status: 200,
        data: upcomingMeetups,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'No upcoming meetups!',
    });
  }
  /* delete a meetup */
  static deleteMeetup(req, res) {
    const meetupsNumber = meetups.length;
    let NewMeetupsNumber = meetups.length;
    for (let i in meetups) {
      if (meetups[i].id === parseInt(req.params.meetupId)) {
        meetups.splice(i, 1);
        NewMeetupsNumber -= 1;
        break;
      }
    }

    if (NewMeetupsNumber < meetupsNumber) {
      return res.status(200).json({
        status: 200,
        data: 'meetup deleted',
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Meetup not deleted!',
    });
  }
}

export default Meetup;