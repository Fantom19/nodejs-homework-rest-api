import { Contact } from "../../models/contact.js";

const getListContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite = true } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find(
      { owner, favorite: favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default getListContacts;
