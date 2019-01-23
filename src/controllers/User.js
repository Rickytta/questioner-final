import Validate from '../helpers/validate';
import db from '../models/db'

class User {
  /* signup */
  static async signup(req, res) {
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

    const text = `INSERT INTO
            users("firstName", "lastName", "otherName", email, phone, username, password, "isAdmin")
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            returning id, "firstName", "lastName", "otherName", email, phone, username, registered, "isAdmin"`;


    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.otherName,
      req.body.email,
      req.body.phone,
      req.body.username,
      req.body.password,
      req.body.isAdmin
    ];

    try {
      let checkUser = '';

      if (req.body.email) {
        checkUser = await db.query('SELECT * FROM users WHERE username=$1 OR email=$2 AND password=$3', [req.body.username, req.body.email, req.body.password]);
      } else {
        checkUser = await db.query('SELECT * FROM users WHERE username=$1 AND password=$2', [req.body.username, req.body.password]);
      }

      if (checkUser.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          error: 'Sorry, this account already exists',
        });
      }

      const {
        rows
      } = await db.query(text, values);
      if (rows.length > 0) {
        rows[0].registered = new Date(rows[0].registered).toDateString();
        return res.status(201).json({
          status: 201,
          data: rows[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
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