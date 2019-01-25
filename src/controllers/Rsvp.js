import db from '../models/db'


class Rsvp {
  /* Create a rsvp */
  static async create(req, res) {
    const text = `INSERT INTO
      rsvps("meetupId", "createdBy", response)
      VALUES($1, $2, $3) RETURNING *`;

    const values = [
      req.params.meetupId,
      req.userId,
      req.body.response
    ];

    try {
      const {
        rows
      } = await db.query(text, values);

      if (rows.length > 0) {
        return res.status(201).json({
          status: 201,
          data: rows[0],
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'rsvp not posted!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* get all rsvps */
  static async getAllRsvps(req, res) {
    try {
      const {
        rows
      } = await db.query('SELECT * FROM rsvps');
      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'rsvps not found!',
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* get rsvp by id */
  static async getRsvp(req, res) {
    try {
      const {
        rows
      } = await db.query('SELECT * FROM rsvps WHERE id=$1', [req.params.rsvpId]);
      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows[0],
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'rsvp not found!',
      });
    } catch (error) {
      console.log(error);
    }
  }

  /* delete a rsvp */
  static async deleteRsvp(req, res) {
    try {
      const {
        rows
      } = await db.query('DELETE FROM rsvps WHERE id=$1 RETURNING *', [req.params.rsvpId]);

      if (rows.length > 0) {
        return res.json({
          status: 204,
          message: 'rsvp deleted',
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'rsvp doesn\'t exist',
      });
    } catch (error) {
      console.log(error)
    }
  }
}
export default Rsvp;