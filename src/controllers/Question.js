import questions from '../models/questions';
import Validate from '../helpers/Validate';

class Question {
  /* Check Question */
  static checkQuestion(questionId) {
    let checkQuestion = {};
    for (const key in questions) {
      if (questions[key].id === questionId) {
        checkQuestion = questions[key];
        checkQuestion.createdOn = new Date(checkQuestion.createdOn).toDateString();
        break;
      }
    }

    return checkQuestion;
  }

  /* Create a question */
  static create(req, res) {
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
    const newQuestion = {
      id: Math.ceil(Math.random() * 100),
      createdOn: Date.now(),
      createdBy: req.body.createdBy,
      meetup: req.params.meetupId,
      title: req.body.title,
      body: req.body.body,
      upvotes: 0,
      downvotes: 0
    };

    questions.push(newQuestion);

    const isCreated = Question.checkQuestion(newQuestion.id);

    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        status: 201,
        data: isCreated,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Question not posted!',
    });
  }
  /* get all questions */
  static getAllQuestions(req, res) {
    if (Object.keys(questions).length > 0) {
      let allQuestions = [];
      questions.forEach(question => {
        question.createdOn = new Date(question.createdOn).toDateString();
        allQuestions.push(question);
      });
      return res.status(200).json({
        status: 200,
        data: allQuestions,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Questions not found!',
    });
  }
  /* get by id */
  static getQuestion(req, res) {
    let question = {};

    for (let key in questions) {
      if (questions[key].id === parseInt(req.params.questionId)) {
        question = questions[key];
        question.createdOn = new Date(question.createdOn).toDateString();
        break;
      }
    }

    if (Object.keys(question).length > 0) {
      return res.status(200).json({
        status: 200,
        data: question,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Question not found!',
    });
  }
  /* delete a question */
  static deleteQuestion(req, res) {
    const questionsNumber = questions.length;
    let NewQuestionsNumber = questions.length;
    for (let i in questions) {
      if (questions[i].id === parseInt(req.params.questionId)) {
        questions.splice(i, 1);
        NewQuestionsNumber -= 1;
        break;
      }
    }

    if (NewQuestionsNumber < questionsNumber) {
      return res.status(200).json({
        status: 200,
        data: 'question deleted',
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Question not deleted!',
    });
  }

  /* upvote a question */
  static upvoteQuestion(req, res) {
    let oldVotes = 0;
    let newVotes = 0;
    let question = {};
    for (let i in questions) {
      if (questions[i].id === parseInt(req.params.questionId)) {
        oldVotes = questions[i].upvotes;
        questions[i].upvotes += parseInt(req.body.upvote);
        newVotes = questions[i].upvotes;
        question = Question.checkQuestion(questions[i].id);
        break;
      }
    }

    if (oldVotes !== newVotes) {
      return res.status(200).json({
        status: 200,
        data: question,
        message: 'Thanks for upvoting this question!',
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Upvote failed',
    });
  }

  /* downvote a question */
  static downvoteQuestion(req, res) {
    let oldVotes = 0;
    let newVotes = 0;
    let question = {};
    for (let i in questions) {
      if (questions[i].id === parseInt(req.params.questionId)) {
        oldVotes = questions[i].downvotes;
        questions[i].downvotes += parseInt(req.body.downvote);
        newVotes = questions[i].downvotes;
        question = Question.checkQuestion(questions[i].id);
        break;
      }
    }

    if (oldVotes !== newVotes) {
      return res.status(200).json({
        status: 200,
        data: question,
        message: 'Thanks for downvoting this question!',
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Downvote failed',
    });
  }
}

export default Question;