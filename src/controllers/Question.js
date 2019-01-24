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
      questions("createdBy", "meetupId", title, body)
      VALUES($1, $2, $3, $4) RETURNING *`;

    const values = [
      req.userId,
      req.params.meetupId,
      req.body.title,
      req.body.body,
    ];

    try {
      const checkMeetup = await db.query('SELECT * FROM meetups WHERE id=$1', [req.params.meetupId]);

      if (checkMeetup.rows.length <= 0) {
        return res.status(200).json({
          status: 200,
          error: 'Sorry, this meetup doesn\'t exist',
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
      } = await db.query('SELECT * FROM questions WHERE "meetupId"=$1', [req.params.meetupId]);
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
        return res.json({
          status: 204,
          message: 'question deleted',
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'question doesn\'t exist',
      });
    } catch (error) {
      console.log(error)
    }
  }

  /* vote a question */
  static async voteQuestion(req, res) {
    const upvote = req.url.search('/upvote') > 0 ? 1 : 0;
    const downvote = req.url.search('/downvote') > 0 ? 1 : 0;
    const text = 'INSERT INTO votes("questionId", "userId", upvotes, downvotes) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [
      req.params.questionId,
      req.userId,
      upvote,
      downvote
    ];
    try {
      const checkQuestion = await db.query('SELECT * FROM questions WHERE id=$1', [req.params.questionId]);

      if (checkQuestion.rows.length <= 0) {
        return res.status(200).json({
          status: 200,
          error: 'Sorry, this question doesn\'t exist',
        });
      }

      const checkVote = await db.query('SELECT * FROM votes WHERE "questionId"=$1 AND "userId"=$2', [req.params.questionId, req.userId]);

      if (checkVote.rows.length > 0) {
        if ((checkVote.rows[0].upvotes && downvote) || (checkVote.rows[0].downvotes && upvote)) {
          await db.query('DELETE FROM votes WHERE "questionId"=$1 AND "userId"=$2', [req.params.questionId, req.userId])
        } else {
          return res.status(200).json({
            status: 200,
            error: 'Sorry, you can not upvote/downvote more than once the same question',
          });
        }
      }
      const {
        rows
      } = await db.query(text, values);

      if (rows.length > 0) {

        rows[0].upvotes = (await db.query('SELECT * FROM votes WHERE "questionId"=$1 AND upvotes > 0', [req.params.questionId])).rowCount;
        rows[0].downvotes = (await db.query('SELECT * FROM votes WHERE "questionId"=$1 AND downvotes > 0', [req.params.questionId])).rowCount;

        return res.status(200).json({
          status: 200,
          data: rows[0],
          message: `successful`,
        });
      }

      return res.status(400).json({
        status: 400,
        error: `fail`,
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export default Question;