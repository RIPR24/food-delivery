const mongoose = require("mongoose");

const RestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    name: String,
    coor: {},
  },
  types: [
    {
      name: String,
      dishes: [
        {
          name: String,
          price: Number,
          isveg: Boolean,
          img: String,
        },
      ],
    },
  ],
  rating: Number,
  sid: String,
  img: String,
  open: Boolean,
});

const Restmodel = mongoose.model("resturants", RestSchema);
module.exports = Restmodel;
