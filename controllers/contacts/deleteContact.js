import { HttpError } from "../../helpers/index.js";
import { Contact } from "../../models/contact.js";

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw new HttpError(404, "Not found");
    }

    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
};

export default deleteContact;
