var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    DOB: { type: String },
    gender: { type: String, enum: ["male", "female", "others"] },
    userName: { type: String },
    password: { type: String },
    token: { type: String },
    isDeleted: { type: Boolean, default: false },
  },

  { collection: "users", timestamps: { createdAt: true, updatedAt: true } }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
