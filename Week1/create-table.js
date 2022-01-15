const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword'
  // port : 3307
});

connection.connect();

const dbName = 'meetup';
const database_queries = ['DROP DATABASE IF EXISTS ' + dbName,
                          'CREATE DATABASE IF NOT EXISTS ' + dbName];
database_queries.forEach((query, index) => {
  connection.query(query, function (error, results, fields) {
    if (error) {
        throw error;
    }
    if (index === 0) {
      console.log(`Database ${dbName} has been droped!`);
    } else {
      console.log(`Database ${dbName} has been created!`);
    }
  });
});

const tablesInfo = [
  {
    tableName: 'Invitee',
    fieldsName: ['invitee_no', 'invitee_name', 'invited_by'],
    filedsType: ['INT NOT NULL AUTO_INCREMENT', 'VARCHAR(50) UNIQUE', 'VARCHAR(50)'],
    relation: ['PRIMARY KEY (invitee_no))']
  },
  {
    tableName: 'Room',
    fieldsName: ['room_no', 'room_name', 'floor_number'],
    filedsType: ['INT NOT NULL AUTO_INCREMENT', 'VARCHAR(50) UNIQUE', 'INT'],
    relation: ['PRIMARY KEY (room_no))']
  },
  {
    tableName: 'Meeting',
    fieldsName: ['meeting_no', 'meeting_title', 'starting_time', 'ending_time', 'room_no'],
    filedsType: ['INT NOT NULL UNIQUE', 'VARCHAR(50)', 'TIME', 'TIME', 'INT'],
    relation: ['FOREIGN KEY (room_no) REFERENCES Room (room_no))']
  }
];

connection.changeUser({database : 'meetup'}, function(err) {
  if (err) throw err;
  console.log(`You are connected to ${dbName} Database!`);
});

tablesInfo.forEach((table) => {
  const create_query = `CREATE TABLE IF NOT EXISTS ${table.tableName} (`;
  let addFields_query = [];
  for(let i = 0; i < table.fieldsName.length; i++) {
    addFields_query[i] = `${table.fieldsName[i]} ${table.filedsType[i]}`;
  }
  let createTable_query = `${create_query}${addFields_query.concat(table.relation)}`;
  connection.query(createTable_query, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log(`Table ${table.tableName} has been created!`);
  });
});

connection.end();