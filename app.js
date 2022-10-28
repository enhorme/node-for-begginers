const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");

const registerController = require("./controllers/registrationController");
const authController = require("./controllers/authorizationController");
const refreshController = require("./controllers/refreshTokenController");
const logoutController = require("./controllers/logoutController");

dotenv.config();

const PORT = process.env.NODE_PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.post("/register", registerController.handleRegister);
app.post("/auth", authController.handleAuth);

app.get("/refresh", refreshController.handleRefreshToken);
app.get("/logout", logoutController.handleLogout);

app.listen(PORT, (err) => {
  if (err) console.error(err.message);

  console.log(`SERVER HAS BEEN STARTED AT PORT ${PORT}`);
});
