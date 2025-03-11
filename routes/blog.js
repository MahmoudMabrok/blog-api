const express = require("express");
const auth = require("../middleware/auth");
const { Blog, validate } = require("../models/blog/blog");
const _ = require("lodash");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The title of the blog
 *         content:
 *           type: string
 *           description: The content of the blog
 *         category:
 *           type: string
 *           description: The category of the blog
 *         ownerId:
 *           type: string
 *           description: The id of the owner of the blog
 *       example:
 *         id: d5fE_asz
 *         title: My First Blog
 *         content: This is the content of my first blog
 *         category: Technology
 *         ownerId: 5f8d0d55b54764421b7156c7
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Blog]
 *     summary: Get all blogs
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by title
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: Filter by content
 *     responses:
 *       200:
 *         description: Successful response
 */
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

/**
 * @swagger
 * /:
 *   post:
 *     tags: [Blog]
 *     summary: Create a new blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const blog = new Blog(_.pick(req.body, ["title", "content", "category"]));

  blog.ownerId = req.user._id;

  await blog.save();

  res.send({ message: "Blog created successfully", blog });
});

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [Blog]
 *     summary: Update a blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Blog not found
 *       403:
 *         description: Access denied
 */
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

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [Blog]
 *     summary: Delete a blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       403:
 *         description: Access denied
 */
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
