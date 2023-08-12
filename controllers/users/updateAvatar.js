import path from "path";
import Jimp from "jimp";
import { User } from "../../models/index.js";

const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).quality(60);
    await image.writeAsync(resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default updateAvatar;
