const express = require("express");
const bcrypt = require("bcrypt");
const connection = require("../utils/connection");
const { getToken } = require("../utils/auth");
const UserRouter = express.Router();

UserRouter.post("/login", (req, res) => {
    connection.query('select * from user where email=? and admin=1', [req.body.email], (error, result) => {
        if(result.length !== 1) res.json({ "Error": "Email not found in database" });
        else {
            bcrypt.compare(req.body.password, result[0].password, function(error, _res) {
                if(_res) res.status(201).json({ "message": "Login successful", token: getToken(result[0]) });
                else res.json({ "Error": "Password did not match" });
            });
        }
    });
});

module.exports = UserRouter;
