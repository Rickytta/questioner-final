import express from 'express';
import Comment from '../controllers/Comment';

const router = express.Router();

router.get('/', Comment.getAllComments);
router.get('/:commentId', Comment.getComment);
router.delete('/:commentId', Comment.deleteComment);

export default router;