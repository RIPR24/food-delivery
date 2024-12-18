const { cuserLogin, cuserSignup, allCuser } = require("../controlers/cusercon");

const route = require("express").Router();

route.post("/login", cuserLogin);
route.get("/", allCuser);
route.post("/signup", cuserSignup);

module.exports = route;
