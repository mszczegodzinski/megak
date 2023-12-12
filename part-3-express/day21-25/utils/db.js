const { readFile, writeFile } = require("fs").promises;
const { join } = require("path");
const { v4: uuid } = require("uuid");

class Db {
  constructor(dbFileName) {
    this.dbFileName = join(__dirname, "../data", dbFileName);
    this._load();
  }

  async _load() {
    this._data = JSON.parse(await readFile(this.dbFileName, "utf8"));
    console.log(this._data);
  }

  _save() {
    writeFile(this.dbFileName, JSON.stringify(this._data), "utf8");
  }

  create(obj) {
    const id = uuid();
    this._data.push({ id, ...obj });
    this._save();

    return id;
  }

  getAll() {
    return this._data;
  }

  getOne(id) {
    return this._data.find((obj) => obj.id === id);
  }

  update(id, newObj) {
    this._data = this._data.map((oneObj) =>
      oneObj.id === id
        ? {
            ...oneObj,
            ...newObj,
          }
        : oneObj,
    );
    this._save();
  }

  delete(id) {
    this._data = this._data.filter((obj) => obj.id !== id);
  }
}

const db = new Db("client.json");

module.exports = {
  db,
};
