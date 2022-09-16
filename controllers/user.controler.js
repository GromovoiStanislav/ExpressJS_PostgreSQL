const db = require('../db');

class UserController {
  async createUser(req, res) {
    const { name, sername } = req.body;
    const newPerson = await db.query(
      'INSERT INTO person(name, sername) VALUES($1, $2) RETURNING *',
      [name, sername]
    );
    res.json(newPerson.rows[0]);
  }

  async getUsers(req, res) {
    const users = await db.query('SELECT * FROM person');
    res.send(users.rows);
  }

  async getOneUser(req, res) {
    const id = req.params.id;
    const user = await db.query('SELECT * FROM person WHERE id = $1', [id]);
    res.send(user.rows[0]);
  }

  async updateUser(req, res) {
    const { id, name, sername } = req.body;
    const user = await db.query(
      'UPDATE person SET name=$1,sername=$2 WHERE id = $3 RETURNING *',
      [name, sername, id]
    );
    res.send(user.rows[0]);
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query('DELETE FROM person WHERE id = $1', [id]);
    res.send(user.rows[0]);
  }
}

module.exports = new UserController();
