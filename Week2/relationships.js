const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_Papers (
      id INT NOT NULL AUTO_INCREMENT,
      paper_title NOT NULL VARCHAR(255),
      conference VARCHAR(255),
      publish_date NOT NULL DATE,
      PRIMARY KEY (id)
    );`;
  const CREATE_AUTHOR_PAPER_TABLE = `
    CREATE TABLE IF NOT EXISTS author_paper (
      id INT NOT NULL AUTO_INCREMENT,
      author_id NOT NULL INT,
      paper_id NOT NULL INT,
      PRIMARY KEY (id),
      FOREIGN KEY (author_id) REFERENCES authors(id),
      FOREIGN KEY (paper_id) REFERENCES research_Papers(id)
    );`;
  const authors = [
    {
      author_name: "Canan Dagdeviren",
      university: "MIT",
      date_of_birth: "1985-04-26",
      h_index: 23,
      gender: "f",
      mentor: null,
    },
    {
      author_name: "Ikra Iftekhar Shuvo",
      university: "MIT",
      date_of_birth: "1992-04-26",
      h_index: 3,
      gender: "m",
      mentor: 1,
    },
    {
      author_name: "Aastha Shah",
      university: "MIT",
      date_of_birth: "1989-04-26",
      h_index: 3,
      gender: "f",
      mentor: 1,
    },
    {
      author_name: `Alex 'Sandy' Pentland`,
      university: "MIT",
      date_of_birth: "1980-04-26",
      h_index: 145,
      gender: "m",
      mentor: null,
    },
    {
      author_name: "Ziv Epstein",
      university: "MIT",
      date_of_birth: "1995-04-26",
      h_index: 9,
      gender: "m",
      mentor: 4,
    },
    {
      author_name: "Matthew Groh",
      university: "MIT",
      date_of_birth: "1995-04-26",
      h_index: 10,
      gender: "m",
      mentor: 4,
    },
    {
      author_name: "Abhimanyu Dubey",
      university: "MIT",
      date_of_birth: "1995-04-26",
      h_index: 13,
      gender: "m",
      mentor: 4,
    },
    {
      author_name: "Petter K. Schott",
      university: "Yale",
      date_of_birth: "1975-04-26",
      h_index: 39,
      gender: "m",
      mentor: null,
    },
    {
      author_name: "Amir Goldberg",
      university: "Stanford",
      date_of_birth: "1985-04-26",
      h_index: 15,
      gender: "m",
      mentor: null,
    },
    {
      author_name: "Anat R. Admati",
      university: "Stanford",
      date_of_birth: "1965-04-26",
      h_index: 34,
      gender: "f",
      mentor: null,
    },
    {
      author_name: "Dani Rodrik",
      university: "Harvard",
      date_of_birth: "1990-04-26",
      h_index: 148,
      gender: "m",
      mentor: null,
    },
    {
      author_name: "Stephen Walt",
      university: "Harvard",
      date_of_birth: "1979-04-26",
      h_index: 42,
      gender: "m",
      mentor: 11,
    },
    {
      author_name: "Charles Sabel",
      university: "Harvard",
      date_of_birth: "1977-04-26",
      h_index: 78,
      gender: "m",
      mentor: 11,
    },
    {
      author_name: "Johnny T Y Kung",
      university: "Oxford",
      date_of_birth: "1972-04-26",
      h_index: 15,
      gender: "m",
      mentor: null,
    },
    {
      author_name: "David C. Pinder",
      university: "Oxford",
      date_of_birth: "1982-04-26",
      h_index: 14,
      gender: "m",
      mentor: null,
    },
  ];
  const researchPapers = [
    {
      paper_title:
        "Electronic Textile Sensors for Decoding Vital Body Signals: State-of-the-Art Review on Characterizations and Recommendations",
      conference: "",
      publish_date: "2022-01-13",
    },
    {
      paper_title:
        "Social Influence Leads to the Formation of Diverse Local Trends",
      conference: "",
      publish_date: "2021-10-22",
    },
    {
      paper_title:
        "A COMPARISON OF LATIN AMERICAN AND ASIAN PRODUCT EXPORTS TO THE UNITED STATES, 1972 TO 1999",
      conference: "CUADERNOS DE ECONOMIA",
      publish_date: "2003-12-01",
    },
    {
      paper_title: "The Adaptive Hybrid: Innovation with Virtual Work",
      conference: "",
      publish_date: "2022-07-01",
    },
    {
      paper_title:
        "Associative Diffusion and the Pitfalls of Structural Reductionism",
      conference: "American Sociological",
      publish_date: "2021-11-19",
    },
    {
      paper_title:
        "Capitalism, Laws, and the Need for Trustworthy Institutions",
      conference: "Oxford Review of Economic Policy",
      publish_date: "2021-11-08",
    },
    {
      paper_title: "A primer on trade and inequality",
      conference: "",
      publish_date: "2021-11-17",
    },
    {
      paper_title: "HOW TO CONSTRUCT A NEW GLOBAL ORDER",
      conference: "",
      publish_date: "2021-05-24",
    },
    {
      paper_title: "BUILDING A GOOD JOBS ECONOMY",
      conference: "",
      publish_date: "2019-12-16",
    },
    {
      paper_title: "Long Noncoding RNAs: Past, Present, and Future",
      conference: "Genetics",
      publish_date: "2013-03-01",
    },
    {
      paper_title: `Monitoring the death rates of general practitioners' patients in a single Health Authority`,
      conference: "",
      publish_date: "2002-09-01",
    },
    {
      paper_title:
        "On-Body Energy Harvesters through Innovative Designs and Conformable Structures",
      conference: "",
      publish_date: "2021-11-04",
    },
    {
      paper_title:
        "Simultaneous Recording, Stimulation, and Marking of Brain Microstructures",
      conference: "",
      publish_date: "2020-07-27",
    },
    {
      paper_title: "The Future of Bionic Dynamos",
      conference: "",
      publish_date: "2016-12-02",
    },
    {
      paper_title:
        "Association between COVID-19 Outcomes and Mask Mandates, Adherence, and Attitudes",
      conference: "",
      publish_date: "2021-06-23",
    },
    {
      paper_title: "Universal resilience patterns in labor markets",
      conference: "",
      publish_date: "2021-03-30",
    },
    {
      paper_title:
        "Collective Behavior over Social Networks with Data-driven and Machine Learning Models",
      conference: "",
      publish_date: "2020-05-10",
    },
    {
      paper_title: "Generating Authenticity in Automated Work",
      conference: "",
      publish_date: "2022-01-15",
    },
    {
      paper_title: "The Handover in Hong Kong: Impact on Business Formation",
      conference: "",
      publish_date: "2014-05-28",
    },
    {
      paper_title: "Are Narcissistic CEOs All That Bad?",
      conference: "",
      publish_date: "2021-10-07",
    },
    {
      paper_title:
        "The Three Stages of Disruptive Innovation: Idea Generation, Incubation, and Scaling",
      conference: "",
      publish_date: "2019-05-01",
    },
    {
      paper_title:
        "How leadership matters: The effects of leadership on strategy implementation",
      conference: "",
      publish_date: "2010-07-01",
    },
    {
      paper_title:
        "Collective Behavior over Social Networks with Data-driven and Machine Learning Models",
      conference: "",
      publish_date: "2020-05-10",
    },
    {
      paper_title:
        "Design and preliminary results of a reaction force series elastic actuator for bionic knee and ankle prostheses",
      conference: "",
      publish_date: "2021-07-21",
    },
    {
      paper_title:
        "Neural Interfacing Architecture Enables Enhanced Motor Control and Residual Limb Functionality Post Amputation",
      conference: "",
      publish_date: "2021-02-15",
    },
    {
      paper_title:
        "Flexible Dry Electrodes for EMG Acquisition within Lower Extremity Prosthetic Sockets",
      conference: "",
      publish_date: "2020-11-29",
    },
    {
      paper_title:
        "Design and control of a Two-Degree-of-Freedom powered ankle-foot prosthesis",
      conference: "",
      publish_date: "2020-09-09",
    },
    {
      paper_title:
        "Coordination of Lower Limb Movement Utilizing the Agonist-Antagonist Myoneural Interface",
      conference: "",
      publish_date: "2019-08-09",
    },
    {
      paper_title:
        "MultiDIC: An Open-Source Toolbox for Multi-View 3D Digital Image Correlation",
      conference: "",
      publish_date: "2018-05-04",
    },
    {
      paper_title:
        "Human Leg Model Predicts Muscle Forces, States, and Energetics during Walking",
      conference: "",
      publish_date: "2016-05-13",
    },
  ];
  const author_paper = [
    {
      author_id: 1,
      paper_id: 1,
    },
    {
      author_id: 2,
      paper_id: 1,
    },
    {
      author_id: 3,
      paper_id: 1,
    },
    {
      author_id: 4,
      paper_id: 2,
    },
    {
      author_id: 5,
      paper_id: 2,
    },
    {
      author_id: 6,
      paper_id: 2,
    },
    {
      author_id: 7,
      paper_id: 2,
    },
    {
      author_id: 8,
      paper_id: 3,
    },
    {
      author_id: 9,
      paper_id: 5,
    },
    {
      author_id: 10,
      paper_id: 6,
    },
    {
      author_id: 11,
      paper_id: 7,
    },
    {
      author_id: 11,
      paper_id: 8,
    },
    {
      author_id: 12,
      paper_id: 8,
    },
    {
      author_id: 11,
      paper_id: 9,
    },
    {
      author_id: 13,
      paper_id: 9,
    },
    {
      author_id: 14,
      paper_id: 10,
    },
    // {
    //     author_id: 13,
    //     paper_id: 10
    // },
    // {
    //     author_id: 14,
    //     paper_id: 10
    // },
    {
      author_id: 15,
      paper_id: 11,
    },
    {
      author_id: null,
      paper_id: 12,
    },
    {
      author_id: null,
      paper_id: 13,
    },
    {
      author_id: null,
      paper_id: 14,
    },
    {
      author_id: null,
      paper_id: 15,
    },
    {
      author_id: null,
      paper_id: 16,
    },
    {
      author_id: null,
      paper_id: 17,
    },
    {
      author_id: null,
      paper_id: 18,
    },
    {
      author_id: null,
      paper_id: 19,
    },
    {
      author_id: null,
      paper_id: 20,
    },
    {
      author_id: null,
      paper_id: 21,
    },
    {
      author_id: null,
      paper_id: 22,
    },
    {
      author_id: null,
      paper_id: 23,
    },
    {
      author_id: 4,
      paper_id: 24,
    },
    {
      author_id: null,
      paper_id: 25,
    },
    {
      author_id: null,
      paper_id: 26,
    },
    {
      author_id: null,
      paper_id: 27,
    },
    {
      author_id: null,
      paper_id: 28,
    },
    {
      author_id: null,
      paper_id: 29,
    },
    {
      author_id: null,
      paper_id: 30,
    },
  ];

  connection.connect();

  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_AUTHOR_PAPER_TABLE);
    authors.forEach(async (author) => {
      await execQuery("INSERT INTO authors SET ?", author);
    });
    researchPapers.forEach(async (researchPaper) => {
      await execQuery("INSERT INTO research_Papers SET ?", researchPaper);
    });
    author_paper.forEach(async (authorPaper) => {
      await execQuery("INSERT INTO author_paper SET ?", authorPaper);
    });
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}

seedDatabase();
