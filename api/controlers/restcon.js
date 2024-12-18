const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "../uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

const getAllRest = async (req, res) => {
  try {
    const rest = await Restmodel.find({});
    res.json({ status: "success", rest });
  } catch (error) {
    res.json({ status: error });
  }
};

const getOpenRest = async (req, res) => {
  try {
    const rest = await Restmodel.find({ open: true });
    res.json({ status: "success", rest });
  } catch (error) {
    res.json({ status: error });
  }
};

const getRest = async (req, res) => {
  const { _id } = req.body;
  try {
    const rest = await Restmodel.findById(_id);
    res.json({ status: "success", rest });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

const openRest = async (req, res) => {
  const { _id } = req.body;
  try {
    const rest = await Restmodel.findById(_id);
    rest.open = !rest.open;
    rest.save();
    res.json({ status: "success", rest });
  } catch (error) {
    res.json({ status: error });
  }
};

const restCreate = async (req, res) => {
  const dat = req.body;
  const obj = {
    name: dat.name,
    location: { name: dat.locname, coor: JSON.parse(dat.loccoor) },
    types: JSON.parse(dat.menu),
    rating: +dat.rat,
    sid: "",
    img: `restimg/${req.file.filename}`,
    open: false,
  };

  try {
    const rest = await Restmodel.create(obj);
    res.json({ status: "success", rest });
  } catch (error) {
    res.json({ status: error });
  }
};

const changeRestImg = async (req, res) => {
  const dat = req.body;

  if (dat.prename.length > 0) {
    fs.unlink(`../uploads/${dat.prename}`, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  try {
    const rest = await Restmodel.findById(dat.rid);
    rest.img = `restimg/${req.file.filename}`;
    rest.save();
    res.json({ status: "success", rest });
  } catch (error) {
    console.log(error);
  }
};

const modifyRest = async (req, res) => {
  const obj = req.body;
  try {
    const rest = await Restmodel.findById(obj._id);

    rest.location = obj.location;
    rest.types = obj.types;
    rest.rating = obj.rating;
    rest.save();
    res.json({ status: "success", rest });
  } catch (error) {
    res.json({ status: error });
  }
};

module.exports = {
  getAllRest,
  getOpenRest,
  upload,
  getRest,
  openRest,
  restCreate,
  changeRestImg,
  modifyRest,
};
