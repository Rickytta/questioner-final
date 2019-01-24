import express from 'express';
import Question from '../controllers/Question';
import Comment from '../controllers/Comment';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/:questionId', verifyToken, Question.getQuestion);
router.delete('/:questionId', verifyToken, Question.deleteQuestion);
router.patch('/:questionId/upvote', verifyToken, Question.voteQuestion);
router.patch('/:questionId/downvote', verifyToken, Question.voteQuestion);
router.post('/:questionId/comments', verifyToken, Comment.create);
router.get('/:questionId/comments', verifyToken, Comment.getAllComments);

export default router;