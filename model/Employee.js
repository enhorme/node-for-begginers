const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: { String, require: true },
  lastName: { String, require: true },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
