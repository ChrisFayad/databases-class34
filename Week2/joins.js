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

    let select_queries = [`SELECT a.author_name AS Author, b.author_name AS Mentor
                            FROM authors a
                            JOIN authors b
                            ON a.mentor = b.id`,
                            `SELECT authors.*, research_Papers.paper_title FROM authors
                            LEFT JOIN author_paper
                            ON (author_paper.author_id = authors.id)
                            LEFT JOIN research_Papers
                            ON (author_paper.paper_id = research_Papers.id)`
                        ];
    try {
        select_queries.forEach(async (query, index) => {
            const result = await execQuery(query);
            console.log(`Query number ${index+1} answer is:`);
            for (i in result) {
                console.log(result[i])
            }
        });
    } catch (error) {
        console.error(error);
        connection.end();
    }
    
    connection.end();
}

seedDatabase();