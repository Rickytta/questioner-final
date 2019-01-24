import db from '../models/db'
import Validate from '../helpers/Validate';


class Comment {
  /* Create a comment */
  static async create(req, res) {
    const text = `INSERT INTO
      comments("questionId", "userId", comment)
      VALUES($1, $2, $3) RETURNING *`;

    const values = [
      req.params.questionId,
      req.userId,
      req.body.comment
    ];

    try {
      const checkQuestion = await db.query('SELECT * FROM questions WHERE id=$1', [req.params.questionId]);

      if (checkQuestion.rows.length <= 0) {
        return res.status(200).json({
          status: 200,
          error: 'Sorry, this question doesn\'t exist',
        });
      }
      const {
        rows
      } = await db.query(text, values);

      if (rows.length > 0) {
        rows[0].createdOn = new Date(rows[0].createdOn).toDateString();

        return res.status(201).json({
          status: 201,
          data: rows[0],
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'comment not posted!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* get all comments */
  static async getAllComments(req, res) {
    try {
      const {
        rows
      } = await db.query('SELECT * FROM comments WHERE "questionId"=$1', [req.params.questionId]);
      if (rows.length > 0) {
        let comments = [];
        rows.forEach(comment => {
          comment.createdOn = new Date(comment.createdOn).toDateString();
          comments.push(comment);
        });

        return res.status(200).json({
          status: 200,
          data: comments,
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'comments not found!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* get comment by id */
  static async getComment(req, res) {
    try {
      const {
        rows
      } = await db.query('SELECT * FROM comments WHERE id=$1', [req.params.commentId]);
      if (rows.length > 0) {
        rows[0].createdOn = new Date(rows[0].createdOn).toDateString();

        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'comment not found!',
      });
    } catch (error) {
      console.log(error);
    }
  }

  /* delete a comment */
  static async deleteComment(req, res) {
    try {
      const {
        rows
      } = await db.query('DELETE FROM comments WHERE id=$1 RETURNING *', [req.params.commentId]);

      if (rows.length > 0) {
        return res.json({
          status: 204,
          message: 'comment deleted',
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'comment doesn\'t exist',
      });
    } catch (error) {
      console.log(error)
    }
  }
}
export default Comment;