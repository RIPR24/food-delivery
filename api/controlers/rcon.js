const Rtypemodel = require("./models/Rtypes");

const rtypeCreate = async (req, res) => {
  const { name, dishes, img } = req.body;
  try {
    const chk = await Rtypemodel.find({ name: name });
    if (chk.length > 0) {
      res.json({ status: "Already exists" });
    } else {
      const rtype = await Rtypemodel.create({ name, img, dishes });
      res.json({ status: "success", rtype });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

const rtypeUpdate = async (req, res) => {
  const { rtypeid, dishes, name, img } = req.body;
  try {
    const chk = await Rtypemodel.findById(rtypeid);
    chk.dishes = dishes;
    chk.img = img;
    chk.name = name;
    const rtype = await chk.save();
    res.json({ status: "success", rtype });
  } catch (error) {
    console.log(error);
    res.json({ status: error });
  }
};

const getRtype = async (req, res) => {
  try {
    const rtype = await Rtypemodel.find({});
    res.json({ status: "success", rtype });
  } catch (error) {
    console.log(error);
    res.json({ status: error });
  }
};

module.exports = {
  rtypeCreate,
  rtypeUpdate,
  getRtype,
};
