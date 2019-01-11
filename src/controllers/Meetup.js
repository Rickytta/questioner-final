import meetups from '../models/meetups';

class Meetup {
  /* Checking if the Meetup exixts */
  static checkMeetup(meetupId) {
    let checkMeetup = {};
    for (const key in meetups) {
      if (meetups[key].id === meetupId) {
        checkMeetup = meetups[key];
        break;
      }
    }

    return checkMeetup;
  }
  /* create */
  static create(req, res) {
    const newMeetup = {
      id: Math.ceil(Math.random() + 100),
      createdOn: Date.now(),
      location: req.body.location,
      images: req.body.images,
      topic: req.body.topic,
      happeningOn: Date.parse(new Date(req.body.happeningOn)),
      tags: req.body.tags
    };

    meetups.push(newMeetup);

    const isCreated = Meetup.checkMeetup(newMeetup.id);

    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        status: 201,
        data: isCreated,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Meetup not created!',
    });
  }
  /* get all meetups */
  static getAllMeetups(req, res) {
    if (Object.keys(meetups).length > 0) {
      return res.status(200).json({
        status: 200,
        data: meetups,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Meetups not found!',
    });
  }
  /* get by id */
  static getMeetup(req, res) {
    let meetup = {};

    for (let key in meetups) {
      if (meetups[key].id === parseInt(req.params.meetupId)) {
        meetup = meetups[key];
        break;
      }
    }

    if (Object.keys(meetup).length > 0) {
      return res.status(200).json({
        status: 200,
        data: meetup,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Meetup not found!',
    });
  }
  /* get upcoming meetups */
  static getUpcomingMeetups(req, res) {
    let upcomingMeetups = [];

    for (let key in meetups) {
      if (Date.now() < meetups[key].happeningOn) {
        upcomingMeetups.push(meetups[key]);
        break;
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
}

export default Meetup;