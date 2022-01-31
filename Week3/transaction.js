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

  try {
    await execQuery("START TRANSACTION");

    const firstAccount = await execQuery("SELECT balance FROM account WHERE id = 1");
    const firstAccountBalance = JSON.stringify(firstAccount[0]).split(':')[1].slice(0, -1);
    let firstAccountNewBalance = parseFloat(firstAccountBalance) - 1000;
    await execQuery(`UPDATE account SET balance = ${firstAccountNewBalance} WHERE account_number = 101`);
    
    const secondAccount = await execQuery("SELECT balance FROM account WHERE id = 2");
    const secondAccountBalance = JSON.stringify(secondAccount[0]).split(':')[1].slice(0, -1);
    let secondAccountNewBalance = parseFloat(secondAccountBalance) + 1000;
    await execQuery(`UPDATE account SET balance = ${secondAccountNewBalance} WHERE account_number = 102`);

    const account_changes = {
        account_number: 1,
        change_number: 102,
        amount: 1000,
        change_date: '2022-01-28',
        remark: 'You deserve a Bonus'
    };

    await execQuery('INSERT INTO account_changes SET ?', account_changes);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();
