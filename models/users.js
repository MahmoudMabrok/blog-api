const Joi = require("joi");
const { model, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../startup/config");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.getJwt(), { expiresIn: "1h" });
  return token;
};

const User = model("user", userSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .min(8)
      .required()
      .regex(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])")),
  });

  return schema.validate(user);
}

module.exports = { User, validate };
