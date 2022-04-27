const express = require("express");
const { isAuth, isAdmin } = require("../utils/auth");
const connection = require("../utils/connection");
const VideoRouter = express.Router();

VideoRouter.get("/", isAuth, isAdmin, (req, res) => {
    const { page, limit } = req.query;
    connection.query('select * from video order by created desc limit ? offset ?',
    [parseInt(limit), (parseInt(page)-1)*parseInt(limit)], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

VideoRouter.get("/feed", (req, res) => {
    const { page, limit } = req.query;
    connection.query('select * from video order by created desc limit ? offset ?',
    [parseInt(limit), (parseInt(page)-1)*parseInt(limit)], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

VideoRouter.post("/", isAuth, isAdmin, (req, res) => {
    console.log(req.body);
    connection.query('insert into video (title, link) values (?,?)', [req.body.title,req.body.link], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

VideoRouter.delete("/:id", isAuth, isAdmin, (req, res) => {
    connection.query('delete from video where id = ?', [req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

module.exports = VideoRouter;
