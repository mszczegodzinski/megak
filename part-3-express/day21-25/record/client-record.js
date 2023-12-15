const { ValidationError } = require("../utils/errors");

class ClientRecord {
  constructor(obj) {
    const { id, mail, name, nextContactAt, notes } = obj;

    if (!id || typeof id !== "string") {
      throw new ValidationError("ID has to be a string type");
    }

    if (!name || typeof name !== "string" || name.length < 3) {
      throw new ValidationError("Name must be at least 3 characters long");
    }

    if (!mail || typeof mail !== "string" || mail.indexOf("@") === -1) {
      throw new ValidationError("Incorrect email");
    }

    if (typeof nextContactAt !== "string") {
      throw new ValidationError("Next contact date has to be a string");
    }

    if (typeof notes !== "string") {
      throw new ValidationError("Notes has to be a string");
    }

    this.id = id;
    this.name = name;
    this.mail = mail;
    this.nextContactAt = nextContactAt;
    this.notes = notes;
  }
}

module.exports = {
  ClientRecord,
};
