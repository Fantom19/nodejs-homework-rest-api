import { HttpError } from "../../helpers/index.js";
import { Contact } from "../../models/contact.js";

const getContacts = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw new HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default getContacts;
