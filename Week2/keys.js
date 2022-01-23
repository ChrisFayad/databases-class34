const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors (
      id INT NOT NULL AUTO_INCREMENT,
      author_name VARCHAR(100),
      university VARCHAR(100),
      date_of_birth DATE,
      h_index INT,
      gender ENUM('m', 'f'),
      mentor INT,
      PRIMARY KEY (id),
      FOREIGN KEY (mentor) REFERENCES authors(id)
    );`;

    connection.connect();

    try {
        await execQuery(CREATE_AUTHORS_TABLE);
    } catch (error) {
        console.error(error);
        connection.end();
    }
    connection.end();
}

seedDatabase();