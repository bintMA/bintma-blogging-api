const express = require("express");
const userValidator = require("../validators/userValidation");
const authController = require("../middleware/passport");
const authroute = express.Router();
// SIGNUP ROUTE
authroute.post("/signup", userValidator, authController.signup);

// LOGIN ROUTE
authroute.post("/login", userValidator, authController.login);
module.exports = authroute;
