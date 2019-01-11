import questions from '../models/questions';

class Question {
  /* Check Question */
  static checkQuestion(questionId) {
    let checkQuestion = {};
    for (const key in questions) {
      if (questions[key].id === questionId) {
        checkQuestion = questions[key];
        break;
      }
    }

    return checkQuestion;
  }

  /* Create a question */
  static create(req, res) {
    const newQuestion = {
      id: Math.ceil(Math.random() + 100),
      createdOn: Date.now(),
      createdBy: req.body.createdBy,
      question: req.body.question,
      title: req.body.title,
      body: req.body.body,
      votes: 0
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
      return res.status(200).json({
        status: 200,
        data: questions,
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

  /* vote a question */
  static voteQuestion(req, res) {
    let oldVotes = 0;
    let newVotes = 0;
    for (let i in questions) {
      if (questions[i].id === parseInt(req.params.questionId)) {
        oldVotes = questions[i].votes;

        if (oldVotes === 0 && parseInt(req.body.vote) <= 0) {
          break;
        }

        questions[i].votes = questions[i].votes + (parseInt(req.body.vote));
        newVotes = questions[i].votes;
        break;
      }
    }

    if (oldVotes !== newVotes) {
      return res.status(200).json({
        status: 200,
        data: 'Thanks for voting this question!',
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'Vote failed',
    });
  }
}

export default Question;