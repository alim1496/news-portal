const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../utils/connection");
const { getToken } = require("../utils/auth");
const send = require("../utils/sendMail");
const UserRouter = express.Router();

UserRouter.post("/login", (req, res) => {
    const { email, password, admin } = req.body;
    let sql;
    if(admin) sql = 'select id, fullname, email, password from user where email=? and admin=1';
    else sql = 'select id, fullname, email, password from user where email=?';

    connection.query(sql, [email], (error, result) => {
        if(result.length !== 1) res.json({ "Error": "Email not found in database" });
        else {
            bcrypt.compare(password, result[0].password, function(error, _res) {
                if(_res) res.status(201).json({ "message": "Login successful",
                 token: getToken(result[0], admin), data: { name: result[0].fullname, id: result[0].id } });
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
                    res.status(201).json({ "message": "Successfully registered" });
                    send(fullname, email, Math.floor(Math.random() * 899999 + 100000));
                }
            });
        }
    });
});

module.exports = UserRouter;
