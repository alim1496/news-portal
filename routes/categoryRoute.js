const express = require("express");
const { isAuth, isAdmin } = require("../utils/auth");
const connection = require("../utils/connection");
const CategoryRouter = express.Router();

CategoryRouter.get("/", isAuth, isAdmin, (req, res) => {
    connection.query('select * from category order by created desc', (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

CategoryRouter.get("/divisions", isAuth, isAdmin, (req, res) => {
    connection.query('select * from division order by id', (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

CategoryRouter.post("/", isAuth, isAdmin, (req, res) => {
    connection.query('insert into category (name) values (?)', [req.body.name], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

CategoryRouter.delete("/:id", isAuth, isAdmin, (req, res) => {
    connection.query('delete from category where id = ?', [req.params.id], (error, result) => {
        if(error) res.json({ "Error": "Cannot delete a referenced category." });
        else res.status(201).json({ "message": "Category deleted successfully." });
    });
});

CategoryRouter.get("/feed", (req, res) => {
    connection.query('select id, name from category order by weight desc', (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

module.exports = CategoryRouter;
