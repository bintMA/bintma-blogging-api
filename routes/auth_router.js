const express = require("express");

const authController = require("../middleware/passport");
const authroute = express.Router();
// SIGNUP ROUTE
authroute.post("/signup", authController.signup);

// LOGIN ROUTE
authroute.post("/login", authController.login);
module.exports = authroute;
