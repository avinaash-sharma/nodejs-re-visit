const jwt = require("jsonwebtoken");
const User = require("../models/user");
const adminAuth = (req, res, next) => {
    // res.send('Avinash Sharma')

    const adminToken = "ADMINABC";
    const validRequest = adminToken === 'ADMINABC';
    if (validRequest) {
        next();
    } else {
        res.status(401).send('Not Admin :> not authorized')

    }
}

const userAuth = async (req, res, next) => {
    // res.send('Avinash Sharma')
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is not valid!!!!!!!!!");
        }

        const decodedObj = await jwt.verify(token, "dev@avinash@developer");

        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports = { userAuth };