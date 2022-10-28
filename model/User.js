const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    User: {
      type: String,
      default: 2018,
    },
    Admin: Number,
    Editor: Number,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", UserSchema);
