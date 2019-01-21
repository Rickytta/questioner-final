import users from '../models/users';
import Validate from '../helpers/validate';

class User {
  static checkUser(userId) {
    let checkUser = {};
    for (const key in users) {
      if (users[key].id === userId) {
        checkUser = {
          id: users[key].id,
          firstName: users[key].firstName,
          lastName: users[key].lastName,
          otherName: users[key].otherName,
          email: users[key].email,
          phone: users[key].phone,
          username: users[key].username,
          registered: new Date(users[key].registered).toDateString(),
          isAdmin: users[key].isAdmin
        }
      }
    }

    return checkUser;
  }

  /* signup */
  static signup(req, res) {
    // Validate inputs
    let checkInputs = [];
    checkInputs.push(Validate.name(req.body.firstName, true));
    checkInputs.push(Validate.name(req.body.lastName, true));
    checkInputs.push(Validate.name(req.body.otherName, false));
    checkInputs.push(Validate.email(req.body.email, true));
    checkInputs.push(Validate.phone(req.body.phone, true));
    checkInputs.push(Validate.name(req.body.username, true));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }

    const newUser = {
      id: Math.ceil(Math.random() * 100),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      otherName: req.body.otherName,
      email: req.body.email,
      phone: req.body.phone,
      username: req.body.username,
      password: req.body.password,
      registered: Date.now(),
      isAdmin: req.body.isAdmin,
    };

    users.push(newUser);

    const isCreated = User.checkUser(newUser.id);

    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        status: 201,
        data: isCreated,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'User not created!',
    });
  }

  /* login */
  static login(req, res) {
    // Validate inputs
    let checkInput = false;
    checkInput = Validate.name(req.body.username, true);

    if (checkInput.isValid === false) {
      return res.status(400).json({
        status: 400,
        error: checkInput.error,
      });
    }

    let isUser = {};
    users.forEach((user) => {
      if (user.username === req.body.username && user.password === req.body.password) {
        isUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          otherName: user.otherName,
          email: user.email,
          phone: user.phone,
          username: user.username,
          registered: user.registered,
          isAdmin: user.isAdmin
        }
      }
    });

    if (Object.keys(isUser).length > 0) {
      return res.status(200).json({
        status: 200,
        data: isUser,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'User not found!',
    });
  }
}

export default User;