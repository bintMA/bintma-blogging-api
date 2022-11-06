const passport = require("passport");
const express = require("express");
const user_controller = require("../controller/user_controller");

const userRouter = express.Router();

userRouter.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  user_controller.getUserById
);
userRouter.get("/", user_controller.getAllUsers);

userRouter.patch(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  user_controller.updateUser
);

userRouter.delete(
  "/:userId",
//   passport.authenticate("jwt", { session: false }),
  user_controller.deleteUser
);

module.exports = userRouter;
