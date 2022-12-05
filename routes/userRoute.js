const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../utils/connection");
const { getToken, isAuth, isAdmin } = require("../utils/auth");
const send = require("../utils/sendMail");
const UserRouter = express.Router();

UserRouter.get("/", isAuth, isAdmin, (req, res) => {
    const sql = 'select id, fullname, email, verified, role, mobile from user where admin = 0 order by created desc';
    connection.query(sql, (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

UserRouter.post("/login", (req, res) => {
    const { email, password, admin } = req.body;
    let sql;
    if(admin) sql = 'select id, fullname, email, password, verified, role from user where email=? and role>1';
    else sql = 'select id, fullname, email, password, verified from user where email=?';

    connection.query(sql, [email], (error, result) => {
        if(result.length !== 1) res.json({ "Error": "You are not allowed to login" });
        else {
            bcrypt.compare(password, result[0].password, function(error, _res) {
                if(_res) res.status(201).json({ "message": "Login successful",
                 token: getToken(result[0]), data: { name: result[0].fullname, id: result[0].id, role: result[0].role } });
                else res.json({ "Error": "Password did not match" });
            });
        }
    });
});

UserRouter.post("/register", (req, res) => {
    const { fullname, email, password, phone, nid, dob, address, gender } = req.body;
    bcrypt.hash(password, 10, function(err, hash) {
        if(err) res.status(409).json({ "Error": err });
        else {
            connection.query('insert into user (fullname, email, password, admin, mobile, nid, dob, address, gender, role) values (?,?,?,?,?,?,?,?,?,?)',
            [fullname, email, hash, 0, phone, nid, dob, address, gender, 1], (error, _res) => {
                if(error) res.status(409).json({ "Error": error });
                else {
                    const code = Math.floor(Math.random() * 899999 + 100000);
                    res.status(201).json({ "message": "You have been registered successfully.", "code": code });
                    // send(fullname, email, code);
                }
            });
        }
    });
});

UserRouter.get("/:id", isAuth, (req, res) => {
    connection.query('SELECT fullname, email, mobile, nid, dob, address FROM user where id = ?', 
    [req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(203).json({ "data": result[0] });
    });
});

UserRouter.get("/:email", (req, res) => {
    connection.query('update user set verified = 1 where email = ?', [req.params.email], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(203).json({ "data": result });
    });
});

UserRouter.post("/:id/self", isAuth, (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err) res.status(409).json({ "Error": err });
        else {
            connection.query('update user set fullname = ?, address = ?, password = ? where id = ?', 
            [req.body.fullname, req.body.address, hash, req.params.id], (error, result) => {
                if(error) res.json({ "Error": error });
                else res.status(203).json({ "data": result });
            });
        }
    });
});

UserRouter.patch("/:id", isAuth, isAdmin, (req, res) => {
    connection.query('update user set role = ? where id = ?', [req.body.role, req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(203).json({ "data": result });
    });
});

UserRouter.patch("/verify/:id", isAuth, isAdmin, (req, res) => {
    connection.query('update user set verified = 1 where id = ?', [req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(203).json({ "data": result });
    });
});

module.exports = UserRouter;
