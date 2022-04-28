const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'news_portal_3',
    multipleStatements: true
});

module.exports = connection;
