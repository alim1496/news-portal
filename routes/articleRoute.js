const express = require("express");
const { isAuth, isAdmin } = require("../utils/auth");
const { off } = require("../utils/connection");
const connection = require("../utils/connection");
const ArticleRouter = express.Router();

ArticleRouter.get("/", isAuth, isAdmin, (req, res) => {
    const { page, limit } = req.query;
    connection.query('select id, title, status, published from article where status <> 2 order by published desc limit ? offset ?',
    [parseInt(limit), (parseInt(page)-1)*parseInt(limit)],
    (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

ArticleRouter.post("/", isAuth, isAdmin, (req, res) => {
    const { title, body, cover, category_id, featured, status } = req.body;
    connection.query(
        'insert into article (title, body, cover, category_id, featured, status) values (?,?,?,?,?,?)',
        [title, body, cover, category_id, featured, status], 
        (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

ArticleRouter.delete("/:id", isAuth, isAdmin, (req, res) => {
    connection.query('delete from article where id = ?', [req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

ArticleRouter.get("/category/:id", (req, res) => {
    const { page, limit } = req.query;
    connection.query(
        'select id, title, cover, published from article where category_id = ? and status = 1 order by published desc limit ? offset ?',
        [req.params.id, parseInt(limit), (parseInt(page)-1)*parseInt(limit)], (error, result) => {
            if(error) res.json({ "Error": error });
            else res.status(200).json({ "data": result });
        });
});

ArticleRouter.get("/latest", (req, res) => {
    const { page, limit } = req.query;
    connection.query(
        'select id, title, cover, published from article where status = 1 order by published desc limit ? offset ?',
        [parseInt(limit), (parseInt(page)-1)*parseInt(limit)], (error, result) => {
            if(error) res.json({ "Error": error });
            else res.status(200).json({ "data": result });
        });
});

ArticleRouter.get("/single/:id", (req, res) => {
    connection.query(
        'select * from article where id = ?',
        [req.params.id], (error, result) => {
            if(error) res.json({ "Error": error });
            else res.status(200).json({ "data": result });
        });
});

ArticleRouter.get("/similar/:id", (req, res) => {
    connection.query(
        'select id, title, cover from article where id <> ? and category_id = ? order by rand() limit 5',
        [req.query.excl, req.params.id], (error, result) => {
            if(error) res.json({ "Error": error });
            else res.status(200).json({ "data": result });
        });
});

ArticleRouter.get("/feed", (req, res) => {
    let sql = "select id, title, cover, published from article where category_id = 7 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where category_id = 1 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where category_id = 4 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where category_id = 2 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where category_id = 5 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where category_id = 8 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where category_id = 6 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where category_id = 9 order by published desc limit 5;";

    connection.query(sql, (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ data: result });
    });
});

module.exports = ArticleRouter;
