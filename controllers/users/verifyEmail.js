import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/users.js";

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new HttpError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: "",
    verify: true,
  });

  res.json({
    message: "Verification successful",
  });
};

export default verifyEmail;
