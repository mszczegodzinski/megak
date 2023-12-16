const { pool } = require("./utils/db");
const { TodoRecord } = require("./records/todo.record");
const { TodoRepository } = require("./respositories/todo.repository");

(async () => {
  // find all:
  // const foundTodo = await TodoRepository.findAll();

  // delete one:
  // const foundTodo = await TodoRepository.find('xyz');
  // await TodoRepository.delete(foundTodo);

  // update:
  // const foundTodo = await TodoRepository.find(
  //   "f7abb0ec-1b4c-4c65-b205-8a513318fab5",
  // );
  // foundTodo.title = "New updated title by ToDoRepository";
  // await TodoRepository.update(foundTodo);

  // console.log(foundTodo);

  await pool.end();
})();
