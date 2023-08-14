import { HttpError, sendEmail } from "../../helpers/index.js";
import { User, schemasUsers } from "../../models/users.js";
import dotenv from "dotenv";

dotenv.config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = schemasUsers.email.validate({ email });

  if (error) {
    throw new HttpError(400, "missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404);
  }

  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Site registration confirmation",
    html: `<a target="_blank" href="${BASE_URL}api/users/verify/${user.verificationToken}">Нажмите для подтверждения регистрации</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

export default resendVerifyEmail;
