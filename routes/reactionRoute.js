const express = require("express");
const { isAuth } = require("../utils/auth");
const connection = require("../utils/connection");
const ReactionRouter = express.Router();

ReactionRouter.get("/", isAuth, (req, res) => {
    const { user_id, article_id } = req.query;
    connection.query('select id, type from reaction where article_id = ? and user_id = ? order by created desc',
    [article_id, user_id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

ReactionRouter.post("/", isAuth, (req, res) => {
    const { type, user_id, article_id } = req.body;
    connection.query('insert into reaction (type, user_id, article_id) values (?, ?, ?)',
    [type, user_id, article_id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

ReactionRouter.patch("/:id", isAuth, (req, res) => {
    connection.query('update reaction set type = ? where id = ?',
    [req.body.type, req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

module.exports = ReactionRouter;
