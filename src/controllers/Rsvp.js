import rsvps from '../models/rsvps'
import Meetup from '../controllers/Meetup'


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

}
export default Rsvp;