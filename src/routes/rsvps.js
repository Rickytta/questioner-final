import express from 'express';
import Rsvp from '../controllers/Rsvp';


const router = express.Router();

router.post('/', Rsvp.create);
router.get('/', Rsvp.getAllRsvps);
router.get('/:questionId', Rsvp.getRsvp);
router.delete('/:questionId', Rsvp.deleteRsvp);

export default router;