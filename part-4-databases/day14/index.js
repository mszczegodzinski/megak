const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'megak_courses',
  namedPlaceholders: true,
  decimalNumbers: true,
});

(async () => {
  console.log('Exercise 1:')
  const [courses] = await pool.execute("SELECT * FROM courses;");
  // console.log(courses);

  console.log('Exercise 2:')
  const [studentsAndCourses] = await pool.execute('SELECT students.id, students.firstName, students.lastName, courses.name ' +
      'FROM students ' +
      'JOIN students_courses ON students.id = students_courses.studentId ' +
      'JOIN courses ON students_courses.courseName = courses.name ' +
      'WHERE students.age >= 18;');

  console.log(studentsAndCourses);

})();

