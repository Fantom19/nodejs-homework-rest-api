// import { NotFound } from "http-errors";
import createError from "http-errors";
import { Contact } from "../../models/index.js";

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    // throw new NotFound(`Contact with id ${contactId} not found`);
    throw createError.NotFound(`Contact with id ${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: { result },
    message: "Contact updated",
  });
};

export default updateContact;
