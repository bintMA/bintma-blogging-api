const blogModel = require("../model/blog_model");

exports.createBlog = async function (req, res, next) {
  try {
    const blogBody = req.body;
    const blogReadingTime = function () {
      const blogLenght =
        blogBody.body.split(" ").length +
        blogBody.title.split(" ").length +
        blogBody.description.split(" ").length;
      console.log(blogLenght);
      const totalReadingtime = blogLenght / 200;
      return `${totalReadingtime} minute`;
    };
    console.log(req.user)
    // console.log({...req.body, author: req.user._id })
    blogBody.reading_time = blogReadingTime();
    let newBlog = await  blogModel.create({ ...req.body,author_id:req.user._id })
  //  newBlog.author = req.user._id
  //  await newBlog.save()
   console.log(newBlog)
    return res.status(201).json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    next(error);
  }
};
exports.getAllBlogs = async function (req, res, next) {
  try {
    const filterBlog = { state: "published" };
    const queryObj = { ...req.query };
    // console.log(queryObj);
    let blogQuery = blogModel.find(filterBlog);

    //sorting read_count, reading_time and timestamp
    if (req.query.sort) {
      const searchBy = req.query.sort.split(",").join(" ");
      blogQuery = blogQuery.sort(searchBy);
    } else {
      blogQuery.sort();
    }

    //pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;
    const skip = (page - 1) * limit;
    blogQuery.skip(skip).limit(limit);
    const Blogs = await blogQuery;
    res.status(200).json({ status: "success", blogList: Blogs.length, Blogs });
  } catch (error) {
    next(error);
  }
};
exports.ownerBlog = async function (req, res, next) {
  console.log(req.user);
  try {
    const Blog = await blogModel.find({ author: req.user._id });
    console.log(Blog);
    return res.status(200).json({ status: "success", Blog });
  } catch (error) {
    next(error);
  }
};
exports.getBlogById = async function (req, res, next) {
  try {
    const { blogId } = req.params;
    console.log(blogId);
    // console.log(blogId);

    let Blog = await blogModel.findById(blogId).populate("author_id");
    console.log(Blog);
    if (!Blog) {
      res.status(404);
      const error = new Error("No blog found with that ID");
      return next(error);
    }
    Blog.read_count += 1;
    await Blog.save({ validateBeforeSave: true });

    res.status(200).json({ status: "success", blogList: Blog.length, Blog });
  } catch (error) {
    next(error);
  }
};
exports.updateBlog = async function (req, res, next) {
  try {
    const { blogId } = req.params;
    const { state } = req.body;

    const blogToBeUpadated = await blogModel.findById(blogId);
    console.log(blogToBeUpadated)
    if (!blogToBeUpadated) {
      return next(new Error("this is not your blog"));
    }
    console.log(blogToBeUpadated.author_id,req.user._id)
    if (blogToBeUpadated.author_id.toString() !== req.user._id) {
      return next(new Error("you are not authorized to upadate blog "));
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(blogId, state, {
      new: true,
      runValidators: true,
    });
    console.log(updatedBlog);
    if (!updatedBlog) {
      res.status(404);
      const error = new Error("No blog found with this ID");
      next(error);
    }
      console.log(updatedBlog.author_id,req.user._id)
    if (updatedBlog.author_id.toString() !== req.user._id) {
      return next(
        new Error("you are not Authorized to perform this operation")
      );
    }
    updatedBlog.state = state;
    await updatedBlog.save();
    return res.status(200).json({ status: "success", updatedBlog });
  } catch (error) {
    next(error);
  }
};

exports.deleteblog = async function (req, res, next) {
  try {
    const { blogId } = req.params;
    const blogToBeDeleted = await blogModel.findById(blogId);
    if (!blogToBeDeleted) {
      return next(new Error("this is not your blog"));
    }
    if (blogToBeDeleted.author_id.toString() !== req.user._id) {
      return next(new Error("you are not authorized to delete blog "));
    }
    const Blog = await blogModel.findByIdAndDelete(blogId);
    console.log(Blog);
    if (!Blog) {
      res.status(404);
      const error = new Error("No blog found with that ID");
      return next(error);
    }
    return res.status(204).json({ messsge: "deletion succesful" });
  } catch (error) {
    next(error);
  }
};


// {
//     "title":"my blog",
//     "description":"my first blog",
    // "tags": "tour"
        // "body":"thank you for reading"
// }