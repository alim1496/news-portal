const express = require("express");
const { isAuth, isAdmin, isSuperAdmin, isEditor } = require("../utils/auth");
const connection = require("../utils/connection");
const HistoryRouter = express.Router();


HistoryRouter.get("/", isAuth, isAdmin, (req, res) => {
    connection.query('select * from history order by id desc',
        (error, result) => {
            if(error) res.json({ "Error": error });
            else res.status(200).json({ "data": result });
        });
});

HistoryRouter.post("/", isAuth, isAdmin, (req, res) => {
    const { title, date } = req.body;
    connection.query('insert into history (title, status, date) values (?,?,?)',
        [title, 0, date], (error, result) => {
            if(error) res.json({ "Error": error });
            else res.status(201).json({ "message": result });
        });
});

HistoryRouter.patch("/:id", isAuth, isEditor, (req, res) => {
    connection.query('update history set status = 1 where id = ?', [req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

HistoryRouter.delete("/:id", isAuth, isEditor, (req, res) => {
    connection.query('delete from history where id = ?', [req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

module.exports = HistoryRouter;
