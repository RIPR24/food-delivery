const { userLogin, userSignup, getAllUsers } = require("../controlers/usercon");

const route = require("express").Router();

route.post("/login", userLogin);
route.post("/signup", userSignup);
route.get("/", getAllUsers);

module.exports = route;
