const Usermodel = require("../models/Users");

const userLogin = async (req, res) => {
  const { mono, password } = req.body;
  try {
    const chk = await Usermodel.find({ mono: mono });
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

const userSignup = async (req, res) => {
  const { name, password, mono, location } = req.body;

  try {
    const chk = await Usermodel.find({ mono: mono });
    if (chk.length > 0) {
      res.json({ status: "User Already Exist" });
    } else {
      const user = await Usermodel.create({
        name: name,
        password: password,
        mono: mono,
        defloc: location,
        cart: {},
      });
      res.json({ status: "success", user });
    }
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const getAllUsers = async (_req, res) => {
  const users = await Usermodel.find({});
  res.json(users);
};

module.exports = {
  userLogin,
  userSignup,
  getAllUsers,
};
