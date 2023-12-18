const { db, client } = require("./utils/db");
const { TodoRecord } = require("./records/todo.record");

(async () => {
  try {
    // update
    // const todo = await TodoRecord.find("61c61f67c82843560b6af652");
    // todo.title = "Rozpocząć coś nowego";
    // await todo.update();
    // console.log(todo);
    // delete
    // const todo = await TodoRecord.find('61c61f67c82843560b6af652');
    // await todo.delete();
    // console.log(todo);
    // display using cursor
    // for await (const todo of await TodoRecord.findAllWithCursor()) {
    //   console.log(new TodoRecord(todo));
    // }
    // update with cursor
    // for await (const todo of await TodoRecord.findAllWithCursor()) {
    //   const record = new TodoRecord(todo);
    //   record.title += " [updated]";
    //   await record.update();
    //   console.log(await TodoRecord.findAll());
    // }
  } finally {
    await client.close();
  }
})();
