import express from 'express';
import Question from '../controllers/Question';


const router = express.Router();

router.post('/', Question.create);
router.get('/', Question.getAllQuestions);
router.get('/:questionId', Question.getQuestion);



export default router;