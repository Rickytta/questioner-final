import express from 'express';
import Question from '../controllers/Question';


const router = express.Router();

router.get('/', Question.getAllQuestions);
router.get('/:questionId', Question.getQuestion);
router.delete('/:questionId', Question.deleteQuestion);
router.patch('/:questionId/upvote', Question.voteQuestion);
router.patch('/:questionId/downvote', Question.voteQuestion);

export default router;