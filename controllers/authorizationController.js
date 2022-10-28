const User = require("../model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleAuth = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ userName: user }).exec();
  if (!foundUser) return res.sendStatus(401);

  const math = await bcrypt.compare(pwd, foundUser.password);

  if (math) {
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userName: foundUser.userName,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "50s" }
    );

    const refreshToken = jwt.sign(
      { userName: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: `user ${user} is logged in`, accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleAuth };
