const express = require("express");
const passport = require("passport");
const blogValidation = require("../validators/blogValidation");
const blog_controller = require("../controller/blog_controller");

const blogRoute = express.Router();

blogRoute.get("/", blog_controller.getAllBlogs);
blogRoute.get(
  "/myBlog",
  passport.authenticate("jwt", { session: false }),
  blog_controller.ownerBlog
);
blogRoute.get("/:blogId", blog_controller.getBlogById);
blogRoute.post(
  "/",
  blogValidation,
  passport.authenticate("jwt", { session: false }),
  blog_controller.createBlog
);
blogRoute.patch(
  "/:blogId",
  passport.authenticate("jwt", { session: false }),
  blog_controller.updateBlog
);
blogRoute.delete(
  "/:blogId",
  passport.authenticate("jwt", { session: false }),
  blog_controller.deleteblog
);

module.exports = blogRoute;
