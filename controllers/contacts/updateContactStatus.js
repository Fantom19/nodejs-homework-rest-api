// import { NotFound } from "http-errors";
import createError from "http-errors";
import { Contact } from "../../models/index.js";

const updateContactStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

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

export default updateContactStatus;
