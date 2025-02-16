import Joi from 'joi';
import { model, Schema } from 'mongoose';

const User = model('user', new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
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
  }
}));


function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])'))
    });
  
    return schema.validate(user);
}

export { User, validateUser };