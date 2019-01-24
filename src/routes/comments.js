import express from 'express';
import Comment from '../controllers/Comment';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/', verifyToken, Comment.getAllComments);
router.get('/:commentId', verifyToken, Comment.getComment);
router.delete('/:commentId', verifyToken, Comment.deleteComment);

export default router;