const { db, client } = require("./utils/db");
const { TodoRecord } = require("./records/todo.record");
const { TodoRepository } = require("./respositories/todo.repository");
const { ObjectId } = require("mongodb");

(async () => {
  try {
    // insert one
    const todo = new TodoRecord({
      title: "Skończyć 2 projekt MongoDB",
    });
    // await TodoRepository.insert(todo);
    // console.log(await TodoRepository.findAll());

    // update record
    // const todo1 = await TodoRepository.find("657f51505b3e37a1add5ac00");
    // todo1.title = "Updated title";
    // await TodoRepository.update(todo1);
    // console.log(await TodoRepository.find("657f51505b3e37a1add5ac00"));

    // delete record
    // const todo2 = await TodoRepository.find("657f51505b3e37a1add5ac00");
    // await TodoRepository.delete(todo2);
    // console.log(await TodoRepository.find("657f51505b3e37a1add5ac00"));
  } finally {
    await client.close();
  }
})();
