import { Schema, model } from "mongoose";
import { emailRegExp } from "./validationExp.js";
import bcrypt from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const { SECRET_KEY } = process.env;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegExp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiUserSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": `Password should have a minimum length of {#limit}.`,
    "any.required": `Password is a required field.`,
  }),
  email: Joi.string().email().required().pattern(emailRegExp).messages({
    "string.email": `Invalid email format.`,
    "string.empty": `Email cannot be an empty field.`,
    "string.pattern.base": `Invalid email format.`,
    "any.required": `Email is a required field.`,
  }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
};

const User = model("user", userSchema);

export { User, joiUserSchema };
