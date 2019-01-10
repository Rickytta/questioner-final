import users from '../models/users';

class User {
  static checkUser(userId) {
    let checkUser = {};
    for (const key in users) {
      if (user[key].id === userId) {
        checkUser = {
          id: user[key].id,
          firstName: user[key].firstName,
          lastName: user[key].lastName,
          otherName: user[key].otherName,
          email: user[key].email,
          phone: user[key].phone,
          username: user[key].username,
          registered: user[key].registered,
          isAdmin: user[key].isAdmin
        }
      }
    }

    return checkUser;
  }

  /* signup */
  static signup(req, res) {
    const newUser = {
      id: Math.ceil(Math.random() + 100),
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