const Ordermodel = require("./models/Orders");

const orderPickup = async (req, res) => {
  const { cid, oid } = req.body;

  try {
    const ordr = await Ordermodel.findById(oid);
    const copy = [...ordr.status, { stat: 1, time: new Date() }];
    ordr.status = copy;
    ordr.deluid = cid;
    await ordr.save();
    res.json({ status: "success", ordr });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const orderPrepaired = async (req, res) => {
  const { rid, oid } = req.body;
  const ordr = await Ordermodel.findById(oid);

  try {
    if (ordr?.cart.rest._id === rid) {
      const date = new Date();
      ordr.timeStamp.push(date.toString());
      ordr.status = 1;
      ordr.save();
      res.json({ status: "success" });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

const orderUnpicked = async (_req, res) => {
  try {
    const ordrs = await Ordermodel.find({ deluid: "" });
    res.json({ status: "success", ordrs });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
};

module.exports = {
  orderPickup,
  orderPrepaired,
  orderUnpicked,
};
