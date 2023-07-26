import { User } from "../../models/index.js";
// import { Conflict } from "http-errors";
import createError from "http-errors";

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    // throw new Conflict(`Email ${email} already registered`);
    throw createError.Conflict(`Email ${email} already register`);
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  res.json({
    status: "success",
    code: 201,
    data: {
      user: newUser,
    },
    message: "Success signup",
  });
};

export default signUp;
