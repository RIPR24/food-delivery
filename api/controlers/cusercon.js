const Cusermodel = require("../models/Cusers");

const cuserLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const chk = await Cusermodel.find({ username: username });
    if (chk.length > 0) {
      if (chk[0].password === password) {
        res.json({ status: "success", user: chk[0] });
      } else {
        res.json({ status: "Wrong Password" });
      }
    } else {
      res.json({ status: "No User Found" });
    }
  } catch (error) {
    res.json({ status: "failed" });
  }
};

const allCuser = async (_req, res) => {
  const users = await Cusermodel.find({});
  res.json(users);
};

const cuserSignup = async (req, res) => {
  const obj = req.body;

  try {
    const chk = await Cusermodel.find({ username: obj.username });
    if (chk.length > 0) {
      res.json({ status: "User Already Exist" });
    } else {
      const user = await Cusermodel.create(obj);
      res.json({ status: "success", user });
    }
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

module.exports = { cuserLogin, cuserSignup, allCuser };
