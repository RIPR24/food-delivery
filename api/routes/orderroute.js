const {
  orderPickup,
  orderPrepaired,
  orderUnpicked,
} = require("../controlers/ordercon");

const route = require("express").Router();

route.post("/pickup", orderPickup);
route.post("/prepaired", orderPrepaired);
route.get("/unpicked", orderUnpicked);

module.exports = route;
