import { User } from "../../models/index.js";
import createError from "http-errors";

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new createError.Unauthorized(`User with email ${email} not found`);
  }

  if (!user.comparePassword(password)) {
    throw new createError.BadRequest("Invalid password");
  }

  const { _id } = user;
  const token = user.createToken();
  const updateUser = await User.findByIdAndUpdate(_id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      user: updateUser,
    },
    message: "Success signin",
  });
};

export default signIn;
