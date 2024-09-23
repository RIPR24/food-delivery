const mongoose = require("mongoose");

const CuserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  defloc: {},
  role: String,
  mono: Number,
  detid: String,
});

const Cusermodel = mongoose.model("cusers", CuserSchema);
module.exports = Cusermodel;
