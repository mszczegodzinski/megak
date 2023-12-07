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

  async create(obj) {
    this._data.push({ id: uuid(), ...obj });
    writeFile(this.dbFileName, JSON.stringify(this._data), "utf8");
  }

  getAll() {
    return this._data;
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
    writeFile(this.dbFileName, JSON.stringify(this._data), "utf8");
  }
}

const db = new Db("client.json");

module.exports = {
  db,
};
