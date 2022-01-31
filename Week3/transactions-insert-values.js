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
    const accounts = [
        {
            account_number: 101,
            balance: 1880
        },
        {
            account_number: 102,
            balance: 880
        },
        {
            account_number: 103,
            balance: 480
        },
        {
            account_number: 104,
            balance: 280
        },
        {
            account_number: 105,
            balance: 1480
        }
    ];
    const account_changes = [
        {
            account_number: 1,
            change_number: 103,
            amount: 250,
            change_date: '2021-11-20',
            remark: 'Happiest Birthday'
        },
        {
            account_number: 5,
            change_number: 104,
            amount: 120,
            change_date: '2022-01-15',
            remark: 'Enjoy Shopping'
        }
    ];

    try {
        accounts.forEach(async account => {
            await execQuery('INSERT INTO account SET ?', account);
        });
        account_changes.forEach(async account_change => {
            await execQuery('INSERT INTO account_changes SET ?', account_change);
        });
    } catch (error) {
        console.error(error);
        connection.end();
    }
    connection.end();
}

seedDatabase();