const mysql = require("mysql2");


// Create a connection pool

const pool = mysql.createPool({
    // host : 'localhost',
    host : '45.55.136.114',
    user : 'F2023_coliphant01',
    // database : 'node-complete',
    database : 'F2023_coliphant0',
    password: "BlackTarantula23!"
});

module.exports = pool.promise();