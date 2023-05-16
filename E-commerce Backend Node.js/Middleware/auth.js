const jwt = require("jsonwebtoken");
// const {count } = require("../models/userModel")
const userModel = require("../Models/userModel");

// authentication
function auth(req, res, next) {
  var { authorization } = req.headers;
  if (authorization) {
    jwt.verify(authorization, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.status(401).json("You Must Be Authentication");
      }
      if (decoded) {
        req.userId = decoded.userId;
        req.isAdmin = decoded.isAdmin;
        console.log("ok");
        console.log(decoded);
        next();
      } else {
        res.status(401).end();
      }
    });
  } else {
    res.status(401).json("Un Authenticated");
  }
}

function isAdmin(req, res, next) {
  auth(req, res, function () {
    if (req.isAdmin === true) {
      next();
    } else {
      return res.status(401).json("not Admin");
    }
  });
}

function isUser(req, res, next) {
  auth(req, res, async function () {
    if (req.isAdmin === false) {
      const reqUser = await userModel.findById(req.userId);
      if (reqUser) {
        next();
      }
    } else {
      return res.status(401).json("not user");
    }
  });
}

module.exports = { auth, isAdmin, isUser };
// module.exports = { auth }
