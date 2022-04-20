const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../utils/connection");
const UserRouter = express.Router();

UserRouter.post("/login", (req, res) => {
    connection.query('select * from user where email=? and admin=1', [req.body.email], (error, result) => {
        if(result.length !== 1) res.json({ "Error": "Email not found in database" });
        else {
            bcrypt.compare(req.body.password, result[0].password, function(error, _res) {
                if(_res) {
                    jwt.sign({ name: result[0].fullname, email: result[0].email, admin: true },
                        "abc-123-secret-7612",
                        (err, token) => {
                            if(!err) {
                                res.status(201).json({ "message": "Login successful", token });
                            } else res.json({ "Error": "Could not sign token" });
                        }
                    );
                } else res.json({ "Error": "Password did not match" });
            });
        }
    });
});

module.exports = UserRouter;
