const { pool } = require("../utils/db");
const { v4: uuid } = require("uuid");
const { ObjectId } = require("mongodb");

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
}

module.exports = {
  TodoRecord,
};
