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
}

export default Question;