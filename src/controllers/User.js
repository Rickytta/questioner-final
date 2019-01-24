import db from '../models/db';
import Validate from '../helpers/Validate';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

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
        const userType = rows[0].isAdmin ? 'admin' : 'normal';
        const token = jwt.sign({
          userId: rows[0].id,
          userType
        }, process.env.SECRET_KEY, {
          expiresIn: 86400, // expires in 24 hours
        });
        rows[0].registered = new Date(rows[0].registered).toDateString();
        return res.status(201).json({
          status: 201,
          data: rows[0],
          token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* login */
  static async login(req, res) {
    // Validate inputs
    let checkInput = false;
    checkInput = Validate.name(req.body.username, true);

    if (checkInput.isValid === false) {
      return res.status(400).json({
        status: 400,
        error: checkInput.error,
      });
    }

    try {
      const {
        rows
      } = await db.query('SELECT * FROM users WHERE username=$1 AND password=$2', [req.body.username, req.body.password]);

      if (rows.length > 0) {
        const userType = rows[0].isAdmin ? 'admin' : 'normal';
        const token = jwt.sign({
          userId: rows[0].id,
          userType
        }, process.env.SECRET_KEY, {
          expiresIn: 86400, // expires in 24 hours
        });
        return res.status(200).json({
          status: 200,
          data: {
            id: rows[0].id,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            otherName: rows[0].otherName,
            email: rows[0].email,
            phone: rows[0].phone,
            username: rows[0].username,
            registered: new Date(rows[0].registered).toDateString(),
            isAdmin: rows[0].isAdmin
          },
          token,
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'Sorry, your username or password is incorrect',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default User;