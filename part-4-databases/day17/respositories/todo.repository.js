const {v4: uuid} = require("uuid");
const {pool} = require("../utils/db");
const {TodoRecord} = require("../records/todo.record");

class TodoRepository {

  static _checkRecord(record) {
    if (!(record instanceof TodoRecord)) {
      throw new Error('Record hast o be an instance of ToDoRecord')
    }
  }

  static async insert(record) {
    TodoRepository._checkRecord(record);
    record.id = record.id ?? uuid();

    await pool.execute("INSERT INTO todos VALUES(:id, :title)", {
      id: record.id,
      title: record.title,
    });

    return record.id;
  }

  static async delete(record) {
    TodoRepository._checkRecord(record)

    if (!record.id) {
      throw new Error("TODO has no ID.");
    }

    await pool.execute("DELETE FROM `todos` WHERE  `id` = :id", {
      id: record.id,
    });
  }

  static async update(record) {
    TodoRepository._checkRecord(record);

    if (!record.id) {
      throw new Error("TODO has no ID.");
    }

    record._validate();

    await pool.execute(
      "UPDATE `todos` SET  `title` = :title WHERE `id` = :id",
      {
        id: record.id,
        title: record.title,
      },
    );
  }

  static async find(id) {
    const [results] = await pool.execute(
      "SELECT * FROM `todos` WHERE `id` = :id",
      {
        id: id,
      },
    );
    return results.length === 1 ? new TodoRecord(results[0]) : null;
  }

  static async findAll() {
    const [results] = await pool.execute("SELECT * FROM `todos`;");
    return results.map(result => new TodoRecord(result));
  }
}

module.exports = {
  TodoRepository
}