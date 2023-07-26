import { Schema, SchemaTypes, model } from "mongoose";
import Joi from "joi";
import { emailRegExp, phoneRegExp } from "./validationExp.js";

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegExp,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages(),
  email: Joi.string().email().pattern(emailRegExp).required().messages(),
  phone: Joi.string().min(7).pattern(phoneRegExp).required().messages(),
  favorite: Joi.boolean(),
});

const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages(),
});

const Contact = model("contact", contactSchema);

export { Contact, joiContactSchema, updateContactStatusSchema };
