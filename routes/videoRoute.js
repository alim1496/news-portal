const express = require("express");
const connection = require("../utils/connection");
const VideoRouter = express.Router();

VideoRouter.get("/", (req, res) => {
    connection.query('select * from video order by created desc', (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

VideoRouter.post("/", (req, res) => {
    console.log(req.body);
    connection.query('insert into video (title, link) values (?,?)', [req.body.title,req.body.link], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

VideoRouter.delete("/:id", (req, res) => {
    connection.query('delete from video where id = ?', [req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

module.exports = VideoRouter;
