import express from 'express';
import Meetup from '../controllers/Meetup';
import Rsvps from '../controllers/Rsvp';
import Question from '../controllers/Question';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/', verifyToken, Meetup.create);
router.get('/', verifyToken, Meetup.getAllMeetups);
router.get('/upcoming', verifyToken, Meetup.getUpcomingMeetups);
router.get('/:meetupId', verifyToken, Meetup.getMeetup);
router.delete('/:meetupId', verifyToken, Meetup.deleteMeetup);
router.post('/:meetupId/rsvps', verifyToken, Rsvps.create);
router.post('/:meetupId/questions', verifyToken, Question.create);

export default router;