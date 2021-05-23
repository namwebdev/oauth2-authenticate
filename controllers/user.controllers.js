const { User } = require("../models/index");

const uploadAvatar = async (req, res) => {
  console.log("test");
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
  if (user) res.status(200).json({ data: user });
  else res.status(404).json({ message: "User not found" });
};

module.exports = { uploadAvatar, getUser };
