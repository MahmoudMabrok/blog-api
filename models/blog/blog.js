const Joi = require("joi");
const { model, Schema, mongo } = require("mongoose");

const { userSchema } = require("../users/users");
const { unique } = require("joi/lib/types/array");

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    unique: true,
    trim: true, 
  },
  content: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
    trim: true, 
  },
  category: {
    type: String,
  },
  ownerId: { 
    type: mongo.ObjectId,  
    required: true
  },
});

const Blog = model("blog", blogSchema);

function validate(blog) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    content: Joi.string().required().min(2).max(1024),
    category: Joi.string(),
  });

  return schema.validate(blog);
}

module.exports = { Blog, validate };
