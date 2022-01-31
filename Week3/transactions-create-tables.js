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
  connection.connect();
  const CREATE_ACCOUNT_TABLE = 
  `CREATE TABLE IF NOT EXISTS account (
      id INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT,
      balance FLOAT
  );`;
  const CREATE_ACCOUNT_CHANGES_TABLE = 
  `CREATE TABLE IF NOT EXISTS account_changes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_number INT,
    change_number INT,
    amount FLOAT,
    change_date DATE,
    remark TEXT,
    FOREIGN KEY (account_number) REFERENCES account(id)
);`;
  try {
        await execQuery(CREATE_ACCOUNT_TABLE);
        await execQuery(CREATE_ACCOUNT_CHANGES_TABLE);
      } catch (error) {
          console.error(error);
          connection.end();
      }
  connection.end();
}

seedDatabase();