// import { NotFound } from "http-errors";
import createError from "http-errors";
import { Contact } from "../../models/index.js";

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    // throw new NotFound(`Contact with id ${contactId} not found`);
    throw createError.NotFound(`Contact with id ${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

export default getContactById;
