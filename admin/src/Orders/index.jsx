import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../App";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Cardrp from "./Cardrp";
import { motion, AnimatePresence } from "framer-motion";

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [arr, setArr] = useState([]);
  const [temp, setTemp] = useState({});
  const { cuser, apiUrl, setPop } = useContext(AdminContext);
  const navigate = useNavigate();
  let orders = [];
  let soc;

  const updateArr = (obj) => {
    orders.push(obj);
    setArr([...orders]);
  };

  function wsCon() {
    soc = io(apiUrl);
    soc.on("connect", () => {
      soc.emit("rest-connect", { rid: cuser.detid, sid: soc.id });
      soc.on("open-success", (msg, ordarr) => {
        if (ordarr) {
          if (ordarr.length > 0) {
            orders = [...ordarr];
            setArr(ordarr);
          }
        }
        setPop({ stat: true, msg });
        setOpen(true);
      });

      soc.on("new-order", (obj) => {
        updateArr(obj);
      });
    });
  }

  const ordrPrepaired = async () => {
    const res = await fetch(apiUrl + "orders/prepaired", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ rid: temp.cart.rest._id, oid: temp._id }),
    });
    const data = await res.json();
    if (data.status === "success") {
      let orders = arr.filter((el) => el._id !== temp._id);
      setArr(orders);
      setTemp({});
    }
  };

  useEffect(() => {
    if (cuser._id) {
    } else {
      navigate("/");
    }
  }, []);

  const openRest = async () => {
    if (cuser.role === "rest-owner") {
      wsCon();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 50,
        width: "100%",
        marginTop: 100,
        marginLeft: 200,
      }}
    >
      <h1>ORDERS</h1>
      {open ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {arr.map((el, i) => {
            return (
              <div
                onClick={(e) => {
                  if (e.target.dataset.ind) {
                    setTemp(arr[e.target.dataset.ind]);
                  }
                }}
                key={i}
              >
                <Cardrp obj={el} ind={i} />
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
          <p>Open the resturant to recive orders</p>
          <button onClick={openRest}>OPEN</button>{" "}
        </div>
      )}
      <AnimatePresence>
        {temp._id && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1,
              height: "100%",
              width: "100%",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backdropFilter: "blur(5px)",
              }}
              onClick={() => {
                setTemp({});
              }}
            ></motion.div>
            <div
              style={{
                width: 400,
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
              }}
            >
              <Cardrp obj={temp} ind={0} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 40,
                }}
              >
                <button onClick={ordrPrepaired}>PRERAIRED</button>
                <button
                  onClick={() => {
                    setTemp({});
                  }}
                >
                  CANCEL
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
