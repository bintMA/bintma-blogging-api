// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// require('dotenv').config()
// const userModel = require('../model/user_model')


// // SIGNUP CONTROLLER ROUTE USING THE FORM_ ENCODED

// //sign token function
// const signToken = (user) => {
//   return jwt.sign({ user }, process.env.JWT_SECRET, {
//     // expiresIn: process.env.EXPIRATION_TIME,
//   });
// };
// exports.signup = async function (req, res, next) {
//   try {
//     const { email, first_name, last_name, password } = req.body;
//     const user = await userModel.create({
//       email,
//       first_name,
//       last_name,
//       password,
//     });
//     user.password = undefined;
//     const token = signToken(user);
//     return res.json({
//       message: "Signup successfull",
//       user,
//       token,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// exports.login = async function (req, res, next) {
//     try {
//       const { email,password } = req.body;
  
//       if (!email || !password ) {
//         const error = new Error("Username or password is incorrect");
//         return next(error);
//       }
//       // check if user exist && password is correct
  
//       const user = await userModel.findOne({ email });
//       console.log(user);
//       if (!user || !(await user.correctPassword(password, user.password))) {
//         const error = new Error("Incorrect email or password");
//         return next(error);
//       }
  
//       // if all conditions are passed then send token
//       user.password = undefined;
//       const token = signToken(user);
//       res.status(200).json({
//         status: "success",
//         token,
//       });
//     } catch (error) {
//       return next(error, { message: "login was not successful try Again!!!" });
//     }
//   };
  

