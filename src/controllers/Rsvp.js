import rsvps from '../models/rsvps';
import Meetup from '../controllers/Meetup';
import validate from '../helpers/validate';


class Rsvp {
  /* Check Rsvp */
  static checkRsvp(rsvpId) {
    let checkRsvp = {};
    for (const key in rsvps) {
      if (rsvps[key].id === rsvpId) {
        checkRsvp = rsvps[key];
        break;
      }
    }

    return checkRsvp;
  }

  /* Create a rsvp */
  static create(req, res) {
    // check if meetup exists
    const checkMeetup = Meetup.checkMeetup(parseInt(req.params.meetupId));
    if (Object.keys(checkMeetup).length === 0) {
      return res.status(400).json({
        status: 400,
        error: 'Meetup not found!',
      });
    }

    const newRsvp = {
      id: Math.ceil(Math.random() + 100),
      meetup: req.params.meetupId,
      user: req.body.user,
      response: req.body.response
    };

    rsvps.push(newRsvp);

    const isCreated = Rsvp.checkRsvp(newRsvp.id);

    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        status: 201,
        data: isCreated,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Rsvp not posted!',
    });
  }
  /* get all rsvps */
  static getAllRsvps(req, res) {
    if (Object.keys(rsvps).length > 0) {
      return res.status(200).json({
        status: 200,
        data: rsvps,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Rsvps not found!',
    });
  }
  /* get by id */
  static getRsvp(req, res) {
    let rsvp = {};

    for (let key in rsvps) {
      if (rsvps[key].id === parseInt(req.params.rsvpId)) {
        rsvp = rsvps[key];
        break;
      }
    }

    if (Object.keys(rsvp).length > 0) {
      return res.status(200).json({
        status: 200,
        data: rsvp,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Rsvp not found!',
    });
  }

  /* delete a rsvp */
  static deleteRsvp(req, res) {
    const rsvpsNumber = rsvps.length;
    let NewRsvpsNumber = rsvps.length;
    for (let i in rsvps) {
      if (rsvps[i].id === parseInt(req.params.rsvpId)) {
        rsvps.splice(i, 1);
        NewRsvpsNumber -= 1;
        break;
      }
    }

    if (NewRsvpsNumber < rsvpsNumber) {
      return res.status(200).json({
        status: 200,
        data: 'rsvp deleted',
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Rsvp not deleted!',
    });
  }
}
export default Rsvp;