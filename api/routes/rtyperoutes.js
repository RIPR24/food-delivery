const { rtypeCreate, rtypeUpdate, getRtype } = require("../controlers/rcon");
const route = require("express").Router();

route.post("/create", rtypeCreate);
route.post("/update", rtypeUpdate);
route.get("/", getRtype);

module.exports = route;
