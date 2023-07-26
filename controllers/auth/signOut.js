import { User } from "../../models/index.js";

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.json({
    status: "success",
    code: 204,
    message: "Success signout",
  });
};

export default signOut;
