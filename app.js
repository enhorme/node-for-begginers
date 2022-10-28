require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const verifyJWT = require("./verify/verifyJWT");

const registerController = require("./controllers/registrationController");
const authController = require("./controllers/authorizationController");
const refreshController = require("./controllers/refreshTokenController");
const logoutController = require("./controllers/logoutController");

const connectDB = require("./config/dbConn");
const PORT = process.env.NODE_PORT || 3001;

//connect MONGO
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.post("/register", registerController.handleRegister);
app.post("/auth", authController.handleAuth);
app.get("/refresh", refreshController.handleRefreshToken);
app.get("/logout", logoutController.handleLogout);

mongoose.connection.once("open", () => {
  console.log("Connected to M_DB");
  app.listen(PORT, (err) => {
    if (err) console.error(err.message);
    console.log(`SERVER HAS BEEN STARTED ON PORT ${PORT}`);
  });
});
