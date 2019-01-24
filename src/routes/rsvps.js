import express from 'express';
import Rsvp from '../controllers/Rsvp';
import verifyToken from '../middlewares/verifyToken';


const router = express.Router();

router.get('/', verifyToken, Rsvp.getAllRsvps);
router.get('/:rsvpId', verifyToken, Rsvp.getRsvp);
router.delete('/:rsvpId', verifyToken, Rsvp.deleteRsvp);

export default router;