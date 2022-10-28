const User = require("../model/User");

const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const duplicate = await User.findOne({ userName: user }).exec();

  if (duplicate) return res.sendStatus(409);

  try {
    const pwdHash = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      userName: user,
      password: pwdHash,
    });
    res.status(201).json({ message: `New user ${user} created!` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { handleRegister };
