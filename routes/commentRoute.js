const express = require("express");
const { isAuth, isAdmin } = require("../utils/auth");
const connection = require("../utils/connection");
const CommentRouter = express.Router();

CommentRouter.get("/", isAuth, isAdmin, (req, res) => {
    connection.query('select * from comment', (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

CommentRouter.post("/", isAuth, (req, res) => {
    const { title, user_id, article_id } = req.body;
    connection.query('insert into comment (title, user_id, article_id, status) values (?, ?, ?, ?)',
    [title, user_id, article_id, 1], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

CommentRouter.get("/:id", (req, res) => {
    const sql = "select c.title, u.fullname, c.posted FROM comment c join user u on c.user_id = u.id where article_id = ? and status = 1 order by posted desc";
    connection.query(sql, [req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

module.exports = CommentRouter;
