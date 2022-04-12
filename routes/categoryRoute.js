const express = require("express");
const connection = require("../utils/connection");
const CategoryRouter = express.Router();

CategoryRouter.get("/", (req, res) => {
    connection.query('select * from category', (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

CategoryRouter.post("/", (req, res) => {
    connection.query('insert into category (name) values (?)', [req.body.name], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

module.exports = CategoryRouter;
