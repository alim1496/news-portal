const express = require("express");
const { isAuth, isAdmin, isSuperAdmin, isEditor } = require("../utils/auth");
const connection = require("../utils/connection");
const ArticleRouter = express.Router();

ArticleRouter.get("/", isAuth, isAdmin, (req, res) => {
    const { page, limit, id, role } = req.query;
    let sql;
    if(role === 2) {
        sql = 'select id, title, status, published, top from article where published_by = '+parseInt(id)+' order by published desc limit '+parseInt(limit)+' offset '+(parseInt(page)-1)*parseInt(limit);
    } else if(role > 2) {
        sql = 'select id, title, status, published, top from article order by published desc limit '+parseInt(limit)+' offset '+(parseInt(page)-1)*parseInt(limit);
    }
    connection.query(sql,
    (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

ArticleRouter.get("/:id", isAuth, isAdmin, (req, res) => {
    connection.query('select * from article where id = ?',
    [req.params.id],
    (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result[0] });
    });
});

ArticleRouter.post("/", isAuth, isAdmin, (req, res) => {
    const { title, body, cover, category_id, featured, status, published_by, division_id } = req.body;
    connection.query(
        'insert into article (title, body, cover, category_id, featured, status, published_by, division_id) values (?,?,?,?,?,?,?,?)',
        [title, body, cover, category_id, featured, status, published_by, division_id], 
        (error, result) => {
            if(error) res.json({ "Error": error });
            else res.status(201).json({ "message": result });
    });
});

ArticleRouter.delete("/:id", isAuth, isSuperAdmin, (req, res) => {
    connection.query('delete from article where id = ?', [req.params.id], (error, result) => {
        if(error) res.status(403).json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

ArticleRouter.patch("/:id", isAuth, isAdmin, (req, res) => {
    const { title, cover, body, featured, status, category_id } = req.body;
    connection.query('update article set title = ?, cover = ?, body = ?, category_id = ?, featured = ?, status = ? where id = ?', 
    [title, cover, body, category_id, featured, status, req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(201).json({ "message": result });
    });
});

ArticleRouter.patch("/top/:id", isAuth, isEditor, (req, res) => {
    connection.query('update article set top = ? where id = ?', [req.body.top, req.params.id], (error, result) => {
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

ArticleRouter.get("/home/latest", (req, res) => {
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

ArticleRouter.get("/home/feed", (req, res) => {
    const _date = new Date().getDate();
    let sql = "select id, title, cover, published from article where status = 1 and category_id = 7 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 1 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 4 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 2 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 5 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 8 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 6 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 9 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where status = 1 and top = 1 order by published desc limit 5;";
    sql += "select id, title, cover, published from article where status = 1 order by published desc limit 5;";
    //sql += `select * from history where date = ${_date};`;
    sql += "select * from history;";

    connection.query(sql, (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ data: result });
    });
});

ArticleRouter.get("/home/divisions", (req, res) => {
    let sql = "select id, title, cover, published from article where status = 1 and category_id = 15 and division_id = 1 order by published desc limit 4;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 15 and division_id = 2 order by published desc limit 4;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 15 and division_id = 3 order by published desc limit 4;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 15 and division_id = 4 order by published desc limit 4;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 15 and division_id = 5 order by published desc limit 4;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 15 and division_id = 6 order by published desc limit 4;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 15 and division_id = 7 order by published desc limit 4;";
    sql += "select id, title, cover, published from article where status = 1 and category_id = 15 and division_id = 8 order by published desc limit 4;";

    connection.query(sql, (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ data: result });
    });
});

ArticleRouter.get("/home/division/:id", (req, res) => {
    const { page, limit } = req.query;
    connection.query(
        'select id, title, cover, published from article where category_id = 15 and status = 1 and division_id = ? order by published desc limit ? offset ?',
        [req.params.id, parseInt(limit), (parseInt(page)-1)*parseInt(limit)], (error, result) => {
            if(error) res.json({ "Error": error });
            else res.status(200).json({ "data": result });
        }
    );
});

ArticleRouter.get("/panel/dashboard", isAuth, isAdmin, (req, res) => {
    let sql = "select count(*) as জাতীয় from article where status = 1 and category_id = 7;";
    sql += "select count(*) as আন্তর্জাতিক from article where status = 1 and category_id = 1;";
    sql += "select count(*) as রাজনীতি from article where status = 1 and category_id = 4;";
    sql += "select count(*) as অর্থনীতি from article where status = 1 and category_id = 2;";
    sql += "select count(*) as বিনোদন from article where status = 1 and category_id = 5;";
    sql += "select count(*) as প্রযুক্তি from article where status = 1 and category_id = 8;";
    sql += "select count(*) as খেলাধুলা from article where status = 1 and category_id = 6;";
    sql += "select count(*) as লাইফস্টাইল from article where status = 1 and category_id = 9;";
    sql += "select count(*) as শীর্ষ from article where status = 1 and top = 1;";
    sql += "select count(*) as সর্বমোট from article where status = 1;";
    sql += "select count(*) as ক্যাটাগরি from category;";
    sql += "select count(*) as ইউজার from user;";
    sql += "select count(*) as ভিডিও from video;";

    connection.query(sql, (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ data: result });
    });
});

module.exports = ArticleRouter;
