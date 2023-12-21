const { pool } = require("../utils/db");
const { v4: uuid } = require("uuid");
const { ObjectId } = require("mongodb");
const { todos } = require("../../day23/utils/db");

class TodoRecord {
  constructor(obj) {
    this.title = obj.title;
    this._id = new ObjectId(obj._id);
    this._validate();
  }

  _validate() {
    if (this.title.trim().length < 5) {
      throw new Error("Tytuł Todosa ma mieć tytuł dluższy niż 5 znaków.");
    }

    if (this.title.length > 150) {
      throw new Error("Tytuł Todosa nie powinien być dłuższy niż 150 znaków.");
    }
  }

  async insert() {
    const { insertedId } = await todos.insertOne({
      _id: this._id,
      title: String(this.title),
    });
    this._id = insertedId;

    return insertedId;
  }

  async delete() {
    await todos.deleteOne({
      _id: this._id,
    });
  }

  async update() {
    await todos.replaceOne({ _id: this._id }, { title: String(this.title) });
  }

  static async find(id) {
    const item = await todos.findOne({ _id: new ObjectId(String(id)) });
    return item === null ? null : new TodoRecord(item);
  }

  static async findAll() {
    const result = await (await todos.find()).toArray();
    return result.map((obj) => new TodoRecord(obj));
  }

  static async findAllWithCursor() {
    return todos.find();
  }
}

module.exports = {
  TodoRecord,
};
