const {
  getAllRest,
  getOpenRest,
  getRest,
  openRest,
  upload,
  restCreate,
  changeRestImg,
  modifyRest,
} = require("../controlers/restcon");
const route = require("express").Router();

route.get("/", getAllRest);
route.get("/openrest", getOpenRest);
route.post("/", getRest);
route.post("/open", openRest);
route.post("/create", upload.single("file"), restCreate);
route.post("/upimg", upload.single("file"), changeRestImg);
route.post("/modify", modifyRest);

module.exports = route;
