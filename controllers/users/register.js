import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { User } from "../../models/index.js";
import { nanoid } from "nanoid";
import { HttpError, sendEmail } from "../../helpers/index.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, `${email} in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Click to confirm registration</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default register;
