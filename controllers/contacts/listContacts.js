import { Contact } from "../../models/index.js";

const listContacts = async (req, res) => {
  const results = await Contact.find({});

  res.json({
    status: "success",
    code: 200,
    data: { results },
  });
};

export default listContacts;
