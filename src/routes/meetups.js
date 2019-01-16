import express from 'express';
import Meetup from '../controllers/Meetup';
import Rsvps from '../controllers/Rsvp';

const router = express.Router();

router.post('/', Meetup.create);
router.get('/', Meetup.getAllMeetups);
router.get('/upcoming', Meetup.getUpcomingMeetups);
router.get('/:meetupId', Meetup.getMeetup);
router.delete('/:meetupId', Meetup.deleteMeetup);
router.post('/:meetupId/rsvps', Rsvps.create);

export default router;