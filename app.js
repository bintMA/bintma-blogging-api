const express = require("express");
const passport = require("passport");
// const bodyparser = require("body-parser");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

const authRouter = require("./routes/auth_router");
const blogRoute = require("./routes/blog_router");
const userRoute = require("./routes/user_router");
require("./middleware/passport");

const app = express();

// Rate Limitter
const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 4,
  standardHeaders: true,
  legacyHeaders: false,
});

// middleware
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet);
app.use(limiter);

app.use("/", authRouter);
app.use("/blogs", blogRoute);
app.use("/users", userRoute);
app.get("/", (req, res) => {
  res.send("welcome to homepage");
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message.message || " error in server";
  return res.status(status).json({ status: "something went wrong", message });
});

module.exports = app;
