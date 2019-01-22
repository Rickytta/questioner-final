import db from '../models/db';
import Validate from '../helpers/Validate';

class Question {
  /* Create a question */
  static async create(req, res) {
    // Validate inputs
    let checkInputs = [];
    checkInputs.push(Validate.title(req.body.title, true));
    checkInputs.push(Validate.title(req.body.body, true));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }

    const text = `INSERT INTO
      questions("createdBy", meetup, title, body, upvotes, downvotes)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [
      req.body.createdBy,
      req.params.meetupId,
      req.body.title,
      req.body.body,
      0, 0
    ];

    try {
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
        error: 'Question not posted!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* get all questions */
  static async getAllQuestions(req, res) {
    try {
      const {
        rows
      } = await db.query('SELECT * FROM questions');
      if (rows.length > 0) {
        let questions = [];
        rows.forEach(question => {
          question.createdOn = new Date(question.createdOn).toDateString();
          questions.push(question);
        });
        return res.status(200).json({
          status: 200,
          data: questions,
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Questions not found!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* get by id */
  static async getQuestion(req, res) {
    try {
      const {
        rows
      } = await db.query('SELECT * FROM questions WHERE id=$1', [req.params.questionId]);
      if (rows.length > 0) {
        rows[0].createdOn = new Date(rows[0].createdOn).toDateString();

        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'Question not found!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* delete a question */
  static async deleteQuestion(req, res) {
    try {
      const {
        rows
      } = await db.query('DELETE FROM questions WHERE id=$1 RETURNING *', [req.params.questionId]);

      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows[0],
          message: 'question deleted',
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'question not deleted!',
      });
    } catch (error) {
      console.log(error)
    }
  }

  /* vote a question */
  static async voteQuestion(req, res) {
    try {
      const {
        rows
      } = await db.query(`UPDATE questions SET ${Object.keys(req.body)[0]}s=${Object.keys(req.body)[0]}s+1 WHERE id=$1 RETURNING *`, [req.params.questionId]);

      if (rows.length > 0) {
        rows[0].createdOn = new Date(rows[0].createdOn).toDateString();
        return res.status(200).json({
          status: 200,
          data: rows[0],
          message: `${Object.keys(req.body)[0]} successful`,
        });
      }

      return res.status(400).json({
        status: 400,
        error: `${Object.keys(req.body)[0]} fail`,
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export default Question;