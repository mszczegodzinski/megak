class TodoRecord {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;

    this._validate();
  }

  _validate() {
    if (this.title.trim() < 5) {
      throw new Error("Todo title should be at least 5 characters long.");
    }

    if (this.title.length > 150) {
      throw new Error("Todo title should be shorter than 150 characters.");
    }
  }
}

module.exports = {
  TodoRecord,
};
