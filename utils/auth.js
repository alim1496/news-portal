const jwt = require("jsonwebtoken");

const getToken = (user) => {
    const { fullname, email } = user;
    return jwt.sign({
        fullname,
        email,
        admin: true
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
    if (!user || !user.admin) {
        res.status(403).send({ message: "Admin role required" });
    } else {{
        next();
    }}
};

module.exports = { getToken, isAuth, isAdmin };
