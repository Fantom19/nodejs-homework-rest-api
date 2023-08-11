import { HttpError } from "../../helpers/index.js";
import { Contact, schemasContact } from "../../models/contact.js";

const putUpdateContact = async (req, res, next) => {
  try {
    const { error } = schemasContact.addSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      throw new HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default putUpdateContact;
