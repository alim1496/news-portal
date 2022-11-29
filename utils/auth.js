const jwt = require("jsonwebtoken");

const getToken = (user) => {
    const { fullname, email, role } = user;
    return jwt.sign({
        fullname,
        email,
        role
    },
    "abc-123-secret-7612",
    {
        expiresIn: '12h',
    });
};

const isAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, "abc-123-secret-7612", (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid token" });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: "Token is not supplied" });
    }
};

const isAdmin = (req, res, next) => {
    const { user } = req;
    if (!user || user.role < 2) {
        res.status(403).send({ message: "Do not have required access" });
    } else {
        next();
    }
};

const isEditor = (req, res, next) => {
    const { user } = req;
    if (!user || user.role < 3) {
        res.status(403).send({ message: "Do not have required access" });
    } else {
        next();
    }
};

const isSuperAdmin = (req, res, next) => {
    const { user } = req;
    if (!user || user.role < 4) {
        res.status(403).send({ message: "Do not have required access" });
    } else {
        next();
    }
};

module.exports = { getToken, isAuth, isAdmin, isSuperAdmin, isEditor };
