import { Contact } from "../../models/index.js";

const currentUser = async (req, res) => {
  const { _id, email, subscription } = req.user;
  const contacts = await Contact.find({ owner: _id });

  res.json({
    status: "success",
    code: 200,
    data: {
      user: { _id, email, subscription },
      contacts,
    },
    message: "Success",
  });
};

export default currentUser;
