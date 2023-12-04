const { pool } = require("./utils/db");
const { TodoRecord } = require("./records/todo.record");

(async () => {
  // first add and delete:
  // const firstTodoItem = new TodoRecord({
  //   title: "Finish day 5th of week 4th of the course",
  // });
  // const newId = await firstTodoItem.insert();
  // console.log("New todo item added with ID", newId);
  // await firstTodoItem.delete();

  // delete record:
  // const foundTodo = await TodoRecord.find(
  //   "f7abb0ec-1b4c-4c65-b205-8a513318fab5",
  // );
  // await foundTodo.delete();

  // update record:
  const foundTodo = await TodoRecord.find(
    "f7abb0ec-1b4c-4c65-b205-8a513318fab5",
  );
  foundTodo.title = "New updated title";
  await foundTodo.update();
  await pool.end();
})();
