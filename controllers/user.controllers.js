const { User } = require("../models/index");

const uploadAvatar = async (req, res) => {
  const { file, user } = req;
  const urlImage = `http://localhost:3000/${file.path}`;
  const userFound = await User.findOne({ email: user.email });
  userFound.avatar = urlImage;
  await userFound.save();
  res.status(200).send(userFound);
};

const getUser = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ where: { username: email } });
  if (user) {
    const { password, ...rest } = user.dataValues;
    res.status(200).json({ data: rest });
  } else res.status(404).json({ message: "User not found" });
};

module.exports = { uploadAvatar, getUser };
