import express from 'express';
import User from '../controllers/User';

const router = express.Router();

router.post('/signup', User.signup);

export default router;