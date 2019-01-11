import express from 'express';
import Question from '../controllers/Question';


const router = express.Router();

router.post('/', Question.create);


export default router;