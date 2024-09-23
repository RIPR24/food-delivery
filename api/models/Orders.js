const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  usid: String,
  name: String,
  cart: {},

  location: {
    name: String,
    coor: {},
  },
  totamo: {
    type: Number,
    required: true,
  },
  mobnum: [Number],
  status: Number,
  timeStamp: [String],
  deluid: String,
  dsid: String,
  delmono: Number,
});

const Ordermodel = mongoose.model("orders", OrderSchema);
module.exports = Ordermodel;
