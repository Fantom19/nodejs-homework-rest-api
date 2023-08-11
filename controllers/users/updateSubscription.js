import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const updateSubscription = async (req, res) => {
  try {
    const { email } = req.user;
    const { subscription } = req.body;

    if (!subscription) {
      throw new HttpError(400, "missing field subscription");
    }

    const result = await User.findOneAndUpdate({ email }, { subscription });

    if (!result) {
      throw new HttpError(404, "Not found");
    }

    res.json({
      email: result.email,
      subscription: result.subscription,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};

export default updateSubscription;
