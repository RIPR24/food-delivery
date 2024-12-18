const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
const mongoose = require("mongoose");
const Ordermodel = require("./models/Orders");
const Cusermodel = require("./models/Cusers");
const Usermodel = require("./models/Users");
const Restmodel = require("./models/Resturant");
const rtyperouter = require("./routes/rtyperoutes");
const restrouter = require("./routes/restroute");
const cuserrouter = require("./routes/cuserroute");
const userrouter = require("./routes/userroute");
const oderrouter = require("./routes/orderroute");

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

app.use("/rtypes", rtyperouter);
app.use("/rest", restrouter);
app.use("/user", userrouter);
app.use("/cuser", cuserrouter);
app.use("/order", oderrouter);
