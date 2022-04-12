const express = require("express");
const connection = require("../utils/connection");
const ArticleRouter = express.Router();

ArticleRouter.get("/", (req, res) => {
    connection.query('select * from article', (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

ArticleRouter.post("/", (req, res) => {
    const { title, body, cover, category_id, featured, status } = req.body;
    connection.query(
        'insert into article (title, body, cover, category_id, featured, status) values (?,?,?,?,?,?)',
        [title, body, cover, category_id, featured, status], 
        (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

module.exports = ArticleRouter;
