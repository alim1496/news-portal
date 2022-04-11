const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'news_portal'
});

app.get("/", (req, res) => {
    connection.query('select * from category', (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

app.post("/add", (req, res) => {
    connection.query('insert into category (name) values (?)', [req.body.name], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

app.listen(3000, () => {
    console.log("Server created successfully");
});
