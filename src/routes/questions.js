import express from 'express';
import Question from '../controllers/Question';
import Comment from '../controllers/Comment';

const router = express.Router();

router.get('/', Question.getAllQuestions);
router.get('/:questionId', Question.getQuestion);
router.delete('/:questionId', Question.deleteQuestion);
router.patch('/:questionId/upvote', Question.voteQuestion);
router.patch('/:questionId/downvote', Question.voteQuestion);
router.post('/:questionId/comments', Comment.create);
router.get('/:questionId/comments', Comment.getAllComments);

export default router;