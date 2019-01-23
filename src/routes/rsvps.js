import express from 'express';
import Rsvp from '../controllers/Rsvp';


const router = express.Router();

router.get('/', Rsvp.getAllRsvps);
router.get('/:rsvpId', Rsvp.getRsvp);
router.delete('/:rsvpId', Rsvp.deleteRsvp);

export default router;