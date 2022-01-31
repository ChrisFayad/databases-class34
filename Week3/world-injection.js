const mysql = require('mysql');

const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});

conn.connect();

// function getPopulation(Country, name, code, cb) {
//   conn.query(
//     `SELECT Population FROM ${Country} WHERE Name = '${name}' and Code = ${code}`,
//     function(err, result) {
//         if (err) cb(err);
//         if (result?.length == 0) cb(new Error("Not found"));
//         cb(null, result);
//     }
//   );
// }

// //Give an example of a value that can be passed as name and code
// //that would take advantage of SQL-injection
// //and (fetch all the records in the database)
// getPopulation('country', "'' OR  1=1", "'' OR  1=1", console.log);
// conn.end();

//Rewrite the function so that it is no longer vulnerable to SQL injection
function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ?? WHERE Name = ? and Code = ?`,
    [Country, name, code],
    function(err, result) {
        if (err) cb(err);
        if (result?.length == 0) cb(new Error("Not found"));
        cb(null, result);
    }
  );
}

getPopulation('country', 'Canada', 'CAN', console.log);
conn.end();