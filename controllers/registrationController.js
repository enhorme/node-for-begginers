const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  console.log(usersDB);
  const duplicate = usersDB.users.find((person) => person.userName === user);

  if (duplicate) return res.sendStatus(409);

  try {
    const pwdHash = await bcrypt.hash(pwd, 10);
    const newUser = {
      userName: user,
      roles: { User: 2018 },
      password: pwdHash,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ message: `New user ${user} created!` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { handleRegister };
