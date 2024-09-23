const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  defloc: {},
  mono: Number,
  cart: {},
});

const Usermodel = mongoose.model("users", UserSchema);
module.exports = Usermodel;
