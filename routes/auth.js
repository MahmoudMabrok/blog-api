const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/users/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("Email already exists");

  // pick only needed data from the request body
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  // do the hashing of the password
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateAuthToken();

  await user.save();

  const userResponse = _.pick(user, ["_id", "name", "email"]);

  res
    .header("x-auth-token", token)
    .status(201)
    .send({ message: "User created successfully", user: userResponse });
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email});

  if (!user) return res.status(401).send("Wrong data.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send('Wrong data.');

  const token = user.generateAuthToken();

  res
  .status(200)
  .send({ message: "User logged in successfully", token });
});

module.exports = router;
