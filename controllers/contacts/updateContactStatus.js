import { HttpError } from "../../helpers/index.js";
import { Contact } from "../../models/contact.js";

const patchUpdateStatusContact = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!result) {
      throw new HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default patchUpdateStatusContact;
