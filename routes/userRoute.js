const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../utils/connection");
const { getToken, isAuth, isAdmin } = require("../utils/auth");
const send = require("../utils/sendMail");
const UserRouter = express.Router();

UserRouter.get("/", isAuth, isAdmin, (req, res) => {
    const sql = 'select id, fullname, email, verified, staff, mobile from user where admin = 0';
    connection.query(sql, (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(200).json({ "data": result });
    });
});

UserRouter.post("/login", (req, res) => {
    const { email, password, admin } = req.body;
    let sql;
    if(admin) sql = 'select id, fullname, email, password, verified, staff from user where email=? and staff=1';
    else sql = 'select id, fullname, email, password, verified from user where email=?';

    connection.query(sql, [email], (error, result) => {
        if(result.length !== 1) res.json({ "Error": "Email not found in database" });
        else {
            bcrypt.compare(password, result[0].password, function(error, _res) {
                if(_res) res.status(201).json({ "message": "Login successful",
                 token: getToken(result[0], admin), data: { name: result[0].fullname, id: result[0].id, verified: result[0].verified === 1 } });
                else res.json({ "Error": "Password did not match" });
            });
        }
    });
});

UserRouter.post("/register", (req, res) => {
    const { fullname, email, password, phone, nid, dob, address, gender } = req.body;
    bcrypt.hash(password, 10, function(err, hash) {
        if(err) res.status(409).json({ "Error": error });
        else {
            connection.query('insert into user (fullname, email, password, admin, mobile, nid, dob, address, gender, staff) values (?,?,?,?,?,?,?,?,?,?)',
            [fullname, email, hash, 0, phone, nid, dob, address, gender, 0], (error, _res) => {
                if(error) res.status(409).json({ "Error": error });
                else {
                    const code = Math.floor(Math.random() * 899999 + 100000);
                    res.status(201).json({ "message": "You have been registered successfully.", "code": code });
                    send(fullname, email, code);
                }
            });
        }
    });
});

UserRouter.get("/:email", (req, res) => {
    connection.query('update user set verified = 1 where email = ?', [req.params.email], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(203).json({ "data": result });
    });
});

UserRouter.patch("/:id", (req, res) => {
    connection.query('update user set staff = ? where id = ?', [req.body.staff, req.params.id], (error, result) => {
        if(error) res.json({ "Error": error });
        else res.status(203).json({ "data": result });
    });
});

module.exports = UserRouter;
