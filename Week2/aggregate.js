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

    let select_queries = [`SELECT research_Papers.paper_title, COUNT(author_name)
                            FROM authors
                            JOIN author_paper
                            ON authors.id = author_paper.author_id
                            JOIN research_Papers
                            ON research_Papers.id = author_paper.paper_id
                            GROUP BY research_Papers.paper_title`,
                            `SELECT COUNT(author_name) AS 'Number of Female Authors' FROM authors WHERE authors.gender = 'f'`,
                            `SELECT university, AVG(h_index) FROM authors GROUP BY university`,
                            `SELECT university, COUNT(paper_title)
                            FROM authors
                            JOIN author_paper
                            ON authors.id = author_paper.author_id
                            JOIN research_Papers
                            ON research_Papers.id = author_paper.paper_id
                            GROUP BY authors.university`,
                            `SELECT university, MIN(h_index), MAX(h_index) FROM authors GROUP BY university`
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