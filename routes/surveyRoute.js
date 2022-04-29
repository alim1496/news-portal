const express = require("express");
const { isAuth, isAdmin } = require("../utils/auth");
const connection = require("../utils/connection");
const SurveyRouter = express.Router();

SurveyRouter.get("/", isAuth, isAdmin, (req, res) => {
    connection.query('select * from survey',
    (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

SurveyRouter.get("/feed", (req, res) => {
    const d = new Date().getDate();
    connection.query('select * from survey where serial = ?', [d],
    (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

SurveyRouter.post("/:id", (req, res) => {
    const { yes, no, maybe } = req.body;
    connection.query('update survey set yes = ?, no = ?, maybe = ? where id = ?',
    [yes, no, maybe, req.params.id],
    (error, result) => {
        if(error) res.json({ "Error": error });
        else {
            connection.query('select * from survey where id = ?', [req.params.id], (e, r) => {
                if(e) res.json({ "Error": e });
                else res.status(200).json({ "data": r });
            });
        }
    });
});

module.exports = SurveyRouter;
