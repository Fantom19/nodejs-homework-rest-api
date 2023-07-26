// import { NotFound } from "http-errors";
import createError from "http-errors";
import { Contact } from "../../models/index.js";

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    // throw new NotFound(`Contact with id ${contactId} not found`);
    throw createError.NotFound(`Contact with id ${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: `Contact with id ${contactId} deleted`,
  });
};

export default removeContact;
