import { createContext, useEffect, useMemo, useState } from "react";
import Nav from "./Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import io from "socket.io-client";
import Popup from "./Popup";

export const FDfrontContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [logp, setLogp] = useState(false);
  const [opnrest, setOpnrest] = useState([]);
  const [restfilter, setRestfilter] = useState({});
  const [isloaded, setIsloaded] = useState(false);
  const [rtypes, setRtypes] = useState([]);
  const apiUrl = "http://localhost:4000/";
  const [dataarr, setDataarr] = useState([]);
  const [socket, setSocket] = useState();
  const [pop, setPop] = useState({ stat: false, msg: "" });

  const getdet = async () => {
    const res = await fetch(apiUrl + "openrest");
    const data = await res.json();
    setOpnrest(data.rest);

    const res2 = await fetch(apiUrl + "rtype");
    const data2 = await res2.json();
    setRtypes(data2.rtype);

    setIsloaded(true);

    setDataarr(setData(data.rest, data2.rtype));
  };

  const loginUser = async (mono, password) => {
    const res = await fetch(apiUrl + "user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mono, password }),
    });
    const data = await res.json();
    if (data.status === "success") {
      setUser(data.user);
      setSocket(io(apiUrl));
      if (data.user.cart) setCart(data.user.cart);
      return data.status;
    }
  };

  function setData(dat, dat2) {
    const data1 = dat.map((el) => {
      return { name: el.name, type: "rest", id: el._id };
    });
    const data2 = dat2.map((el) => {
      return { name: el.name, type: "rtype", id: el._id };
    });
    let data3 = [];
    dat2.forEach((el) => (data3 = [...data3, ...el.dishes]));
    data3 = data3.map((el) => {
      return { name: el.name, type: "dish", id: "" };
    });
    const data = [...data1, ...data2, ...data3];

    //console.log(data);
    return data;
  }

  useEffect(() => {
    if (user._id) {
      socket.emit("user-upd-cart", { uid: user._id, cart });
    }
  }, [cart]);

  useEffect(() => {
    getdet();
    if (user.name) {
    } else {
      const ur = localStorage.getItem("user-cred");
      if (ur) {
        const cred = JSON.parse(ur);
        loginUser(cred.mono, cred.password);
      }
    }
  }, []);
  return (
    <>
      <FDfrontContext.Provider
        value={{
          user,
          setUser,
          opnrest,
          rtypes,
          dataarr,
          cart,
          setCart,
          restfilter,
          setRestfilter,
          apiUrl,
          logp,
          setLogp,
          loginUser,
          socket,
          setPop,
        }}
      >
        {isloaded && <Nav />}
        {isloaded && <Outlet />}
        {pop.stat && <Popup msg={pop.msg} setPop={setPop} />}
        <ScrollRestoration />
      </FDfrontContext.Provider>
    </>
  );
}

export default App;
