import { HttpError } from "../../helpers/index.js";
import { Contact, schemasContact } from "../../models/contact.js";

const postAddContact = async (req, res, next) => {
  try {
    const { error } = schemasContact.addSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, "missing required name field");
    }
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default postAddContact;
