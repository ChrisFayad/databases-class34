var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'meetup'
});

connection.connect();

const inviteeData = [`('Andrea', 'Chris')`, `('Maya', 'Chris')`,
                      `('Marion', 'Chris')`, `('Levon', 'Chris')`,
                      `('Rima', 'Chris')`];
const roomData = [`('JS', 101)`, `('C#', 103)`,
                  `('C', 105)`, `('Python', 107)`,
                  `('PHP', 109)`];
const meetingData = [`(2, 'Social Interview', '12:00', '13:00', 1)`,
                     `(4, 'Tech Interview', '13:00', '13:45', 2)`,
                     `(6, 'Assignment Interview', '14:00', '14:30', 4)`,
                     `(8, 'Module Interview', '15:00', '15:20', 2)`,
                     `(10, 'Graduation Interview', '16:00', '17:20', 1)`];
let insert_queries = [];

inviteeData.forEach(data => {
    insert_queries.push(`INSERT IGNORE INTO Invitee (invitee_name, invited_by)
                        VALUES ${data}`);
});
roomData.forEach(data => {
    insert_queries.push(`INSERT IGNORE INTO Room (room_name, floor_number)
                        VALUES ${data}`);
});
meetingData.forEach(data => {
    insert_queries.push(`INSERT IGNORE INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no)
                        VALUES ${data}`);
});

insert_queries.forEach(query => {
    console.log("Going to run ", query);
    connection.query(query, function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log(`New Record has been added!`);
    });
});

connection.end();
