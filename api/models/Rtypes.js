const mongoose = require("mongoose");

const RtypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: String,
  dishes: [],
});

const Rtypemodel = mongoose.model("rtypes", RtypeSchema);
module.exports = Rtypemodel;
