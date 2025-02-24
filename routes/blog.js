const express = require("express");
const auth = require("../middleware/auth");
const { Blog, validate } = require("../models/blog/blog");
const _ = require("lodash");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const category = req.query.category?.trim() || null;
  const title = req.query.title?.trim() || null;
  const content = req.query.content?.trim() || null;

  let query = {};

  if (category) {
    query.category = { $eq: category};  
  }

  if (title) {
    query.title = { $regex: new RegExp(`.*${title}.*`, "i") };
  }

  if (content) {
    query.content = { $regex: new RegExp(`.*${content}.*`, "i") };
  }
  
  const blogs = await Blog.find(query).select("-__v -ownerId");

  res.send({ data: blogs, count: blogs.length , query });
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const blog = new Blog(_.pick(req.body, ["title", "content", "category"]));

  blog.ownerId = req.user._id;

  await blog.save();

  res.send({ message: "Blog created successfully", blog });
});

router.put("/:id", auth, async (req, res) => {

  const { title, content, category } = req.body;

  if (!title && !content && !category) return res.status(400).send({ message: "send at least one item to update" });

  let blog = await Blog.findOne({ _id: req.params.id });

  if (!blog) return res.status(404).send({ message : "Blog not found"});

  if (blog.ownerId != req.user._id)
    return res
      .status(403)
      .send({
        error: "Access denied",
        message: "you can not modify content you have not created",
      });

  if (title){
    blog.title = title;
  }    
  if (content){
    blog.content = content;
  }
  if (category){
    blog.category = category;
  }

  await blog.save();

  res.send({ message: "Blog updated successfully", blog });
});

router.delete("/:id", auth, async (req, res) => {
  let blog = await Blog.findOne({ _id: req.params.id });

  if (!blog) return res.status(404).send({ message: "Blog not found" });

  if (blog.ownerId != req.user._id)
    return res
      .status(403)
      .send({
        error: "Access denied",
        message: "you can not modify content you have not created",
      });

  await blog.deleteOne();

  res.send({ message: "Blog deleted successfully", blog });
});

module.exports = router;
