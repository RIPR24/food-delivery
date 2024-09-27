const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
const mongoose = require("mongoose");
const Ordermodel = require("./models/Orders");
const Cusermodel = require("./models/Cusers");
const Usermodel = require("./models/Users");
const Rtypemodel = require("./models/Rtypes");
const Restmodel = require("./models/Resturant");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

const db = mongoose.connect(process.env.API_URI);
const PORT = process.env.PORT || 4000;

let curws = [];

let trackorders = [];

app.use(cors());
app.use("/restimg", express.static("./uploads/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const expser = app.listen(PORT, () => {
  console.log("this runs");
});

const socket = new Server(expser, {
  cors: {
    origin: "*",
  },
});

socket.on("connection", (soc) => {
  soc.on("disconnect", async () => {
    const dis = curws.find((el) => el.sid === soc.id);
    if (dis) {
      curws = curws.filter((el) => el.sid !== soc.id);

      if (dis.type === "rest") {
        const rest = await Restmodel.findById(dis.rid);
        rest.sid = "";
        rest.open = false;
        rest.save();
      }
    }
  });

  soc.on("rest-connect", async (obj) => {
    const rob = curws.findIndex((el) => el.rid === obj.rid);
    if (rob >= 0) {
      curws[rob].sid = obj.sid;
    } else {
      curws.push({ ...obj, type: "rest" });
    }

    const rest = await Restmodel.findById(obj.rid);
    if (rest) {
      rest.sid = obj.sid;
      rest.open = true;
      rest.save();
      const ordrs = await Ordermodel.find({
        status: 0,
        "cart.rest._id": obj.rid,
      });
      socket.to(obj.sid).emit("open-success", "success", ordrs);
    }
  });

  soc.on("user-change-loc", async (obj) => {
    const user = await Usermodel.findById(obj.uid);
    user.defloc = obj.defloc;
    user.save();
  });

  soc.on("user-upd-cart", async (obj) => {
    const user = await Usermodel.findById(obj.uid);
    user.cart = obj.cart;
    user.save();
  });

  soc.on("place-order", async (obj) => {
    const order = await Ordermodel.create(obj);
    //console.log(order);
    const rob = curws.find((el) => el.rid === obj.cart.rest._id);
    if (rob) {
      socket.emit("new-order", obj);
    }

    socket.to(obj.usid).emit("order-placed-success", true);

    const ordrs = await Ordermodel.find({ deluid: "" });
    socket.emit("unpicked-orders", ordrs);
  });

  soc.on("get-user-orders", async (obj) => {
    const orders = await Ordermodel.find({ userid: obj.uid });
    socket.to(obj.usid).emit("user-orders-res", orders);
  });

  soc.on("del-login", async (obj) => {
    curws.push({ delid: obj.delid, sid: soc.id, type: "del" });
    const orders = await Ordermodel.where("deluid")
      .equals(obj.delid)
      .where("status")
      .lt("3");
    if (orders.length > 0) {
      orders.forEach((order) => {
        order.dsid = soc.id;
        order.save();
      });
    }
    socket.to(soc.id).emit("picked-orders", orders);
  });

  soc.on("get-orders", async (obj) => {
    const ordrs = await Ordermodel.find({ deluid: "" });
    socket.to(soc.id).emit("unpicked-orders", ordrs);
  });

  soc.on("del-order-select", async (obj) => {
    const order = await Ordermodel.findById(obj.oid);
    order.deluid = obj.delid;
    order.dsid = soc.id;
    order.save();
    const ordrs = await Ordermodel.find({ deluid: "" });
    socket.emit("unpicked-orders", ordrs);
  });

  soc.on("del-cur-loc", (obj) => {
    //socket.to(obj.delid).emit("del-liv-loc", obj.coor);
    socket.emit(obj.delid, obj.coor);
  });

  soc.on("del-refresh", async (obj) => {
    const orders = await Ordermodel.where("deluid")
      .equals(obj.delid)
      .where("status")
      .lt("3");
    socket.to(soc.id).emit("del-ref-res", orders);
  });

  soc.on("del-ordr-pickup", async (obj) => {
    const ordr = await Ordermodel.findById(obj.oid);

    if (ordr?.deluid === obj.delid) {
      const date = new Date();
      ordr.timeStamp.push(date.toString());
      ordr.status = 2;
      ordr.save();
      socket.to(soc.id).emit("del-pck-res", "success");
    } else {
      socket.to(soc.id).emit("del-pck-res", "failed");
    }
  });

  soc.on("del-ordr-delivered", async (obj) => {
    const ordr = await Ordermodel.findById(obj.oid);

    if (ordr?.deluid === obj.delid) {
      const date = new Date();
      ordr.timeStamp.push(date.toString());
      ordr.status = 3;
      ordr.save();
      socket.to(soc.id).emit("del-delivered-res", "success");
    } else {
      socket.to(soc.id).emit("del-delivered-res", "failed");
    }
  });

  soc.on("ordr-prepaired", async (obj) => {
    const ordr = await Ordermodel.findById(obj.oid);

    if (ordr?.cart.rest._id === obj.rid) {
      const date = new Date();
      ordr.timeStamp.push(date.toString());
      ordr.status = 1;
      ordr.save();
      socket.to(soc.id).emit("order-pre-res", "success");
    } else {
      socket.to(soc.id).emit("order-pre-res", "failed");
    }
  });

  soc.on("user-track-order", async (obj) => {
    // const ordr = await Ordermodel.findById(obj.oid);
    if (trackorders.length > 0) {
      const ind = trackorders.findIndex((el) => {
        return el.uid === obj.uid;
      });
      if (ind >= 0) {
        if (trackorders[ind].sid === soc.id) {
          soc.leave(trackorders[ind].delid);
        } else {
          trackorders[ind].sid = soc.id;
        }
        trackorders[ind].delid = obj.delid;
      } else {
        trackorders.push({ uid: obj.uid, sid: soc.id, delid: obj.delid });
      }
    } else {
      trackorders.push({ uid: obj.uid, sid: soc.id, delid: obj.delid });
    }
    soc.join(obj.delid);
  });
});

//REST API

//rtype

app.post("/rtype/create", async (req, res) => {
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
});

app.post("/rtype/update", async (req, res) => {
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
});

app.get("/rtype", async (req, res) => {
  try {
    const rtype = await Rtypemodel.find({});
    res.json({ status: "success", rtype });
  } catch (error) {
    console.log(error);
    res.json({ status: error });
  }
});

//Resturant

app.get("/rest", async (req, res) => {
  try {
    const rest = await Restmodel.find({});
    res.json({ status: "success", rest });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/openrest", async (req, res) => {
  try {
    const rest = await Restmodel.find({ open: true });
    res.json({ status: "success", rest });
  } catch (error) {
    res.json({ status: error });
  }
});

app.post("/rest", async (req, res) => {
  const { _id } = req.body;
  try {
    const rest = await Restmodel.findById(_id);
    res.json({ status: "success", rest });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
});

app.post("/rest/open", async (req, res) => {
  const { _id } = req.body;
  try {
    const rest = await Restmodel.findById(_id);
    rest.open = !rest.open;
    rest.save();
    res.json({ status: "success", rest });
  } catch (error) {
    res.json({ status: error });
  }
});

app.post("/rest/create", upload.single("file"), async (req, res) => {
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
});

app.post("/rest/upimg", upload.single("file"), async (req, res) => {
  const dat = req.body;

  if (dat.prename.length > 0) {
    fs.unlink(`./uploads/${dat.prename}`, function (err) {
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
});

app.post("/rest/modify", async (req, res) => {
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
});

//User

app.post("/user/login", async (req, res) => {
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
});

app.post("/user/signup", async (req, res) => {
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
});

app.get("/users", async (req, res) => {
  const users = await Usermodel.find({});
  res.json(users);
});

//Cuser

app.post("/cuser/login", async (req, res) => {
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
});

app.get("/cusers", async (req, res) => {
  const users = await Cusermodel.find({});
  res.json(users);
});

app.post("/cuser/signup", async (req, res) => {
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
});

//Orders

app.post("/orders/pickup", async (req, res) => {
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
});

app.post("/orders/prepaired", async (req, res) => {
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
});

app.get("/order/unpicked", async (req, res) => {
  try {
    const ordrs = await Ordermodel.find({ deluid: "" });
    res.json({ status: "success", ordrs });
  } catch (error) {
    res.json({ status: "failed", err: error });
  }
});
