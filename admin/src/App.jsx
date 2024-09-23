import { createContext, useEffect, useState } from "react";
import Popup from "./Popup";
import { AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

const dummy1 = {
  username: "abcd",
  password: "abcd",
  defloc: "kalyani",
  role: "rest-owner",
  mono: 9876543210,
  detid: "66e68357fcee8d6e3e5ea8bd",
};

const dummy2 = {
  username: "abcd",
  password: "abcd",
  defloc: "kalyani",
  role: "admin",
  mono: 9876543210,
  detid: "",
};

export const AdminContext = createContext();

function App() {
  const [cuser, setCuser] = useState(dummy1);
  const [items, setItems] = useState([]);
  const [upd, setUpd] = useState(true);
  const [pop, setPop] = useState({ stat: false, msg: "" });
  const apiUrl = "http://localhost:4000/";

  const getdata = async () => {
    const res = await fetch(apiUrl + "rtype");
    const data = await res.json();
    if (data.status === "success") {
      setItems(data.rtype);
      setUpd(false);
    }
  };

  useEffect(() => {
    if (upd) {
      getdata();
    }
  }, [upd]);

  return (
    <AdminContext.Provider
      value={{ cuser, setCuser, items, apiUrl, setUpd, upd, setPop }}
    >
      <div style={{ display: "flex" }}>
        <Nav />
        <Outlet />
      </div>
      <AnimatePresence>
        {pop.stat && <Popup msg={pop.msg} setPop={setPop} />}
      </AnimatePresence>
    </AdminContext.Provider>
  );
}

export default App;
