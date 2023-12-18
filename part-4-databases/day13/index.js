const mysql = require('mysql2/promise');

(async () => {
  //create the connection to database
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'megak_cars',
  });

  // const [result] = await conn.execute("SELECT * FROM cars WHERE registrationNo = 'AAA 12345';");
  // console.log(result);

  // const [result] = await conn.execute("UPDATE cars SET price = price + 10000 WHERE registrationNo = 'AAA 12345';");
  // console.log(result);

  // const [result] = await conn.execute(
  //   "INSERT INTO cars VALUES('SJZ 0001', 'Mercedes', 'AMG', '#ee0000', '2021-01-01', 200000);"
  // );
  // console.log(result);
})();
