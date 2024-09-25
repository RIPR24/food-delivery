import { useContext, useState } from "react";
import { FDfrontContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";
import Mapcomp from "../Mapcomp";
import { NavLink, useNavigate } from "react-router-dom";

const Buynow = () => {
  const { cart, setCart, user, socket, setPop } = useContext(FDfrontContext);
  const [drploc, setDrploc] = useState(user?.defloc?.coor || {});
  const [locpop, setLocpop] = useState(false);
  const [changeloc, setChangeloc] = useState(user?.defloc?.name || "");
  const navigate = useNavigate();

  let totamo = 0;
  if (cart.dishes) {
    totamo = cart.dishes.reduce((acc, el) => acc + el.qnt * el.rate, 0);
  }

  const modifyLoc = () => {
    socket.emit("user-change-loc", {
      uid: user._id,
      defloc: { name: changeloc, coor: drploc },
    });
  };

  const handleClick = () => {
    socket.emit("place-order", {
      userid: user._id,
      usid: socket.id,
      name: user.name,
      status: 0,
      timeStamp: [new Date().toLocaleString()],
      cart,
      location: user.defloc,
      totamo,
      deluid: "",
      dsid: "",
      mobnum: user.mono,
    });
    socket.on("order-placed-success", () => {
      setPop({ stat: true, msg: "Order Confirmed" });
      setCart({});
      navigate("/");
    });
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="bn-cont">
        <div style={{ overflowY: "auto", scrollbarGutter: "stable" }}>
          <div className="bill-comp">
            <p className="header">Particulars</p>
            <p className="header">Qnty</p>
            <p className="header">Rate</p>
            <p className="header">Amount</p>
          </div>
          {cart.dishes ? (
            cart.dishes.map((el, i) => {
              return (
                <div key={i} className="bill-comp">
                  <p style={{ paddingLeft: 10 }}>{el.name}</p>
                  <p>{el.qnt}</p>
                  <p>{"₹ " + el.rate + "/-"}</p>
                  <p>{"₹ " + (el.qnt * el.rate + "/-")}</p>
                </div>
              );
            })
          ) : (
            <div>No Items in your Cart</div>
          )}
          <div className="bill-comp">
            <div
              style={{
                gridColumn: 4,
                borderTop: "3px double black",
                marginTop: 10,
              }}
            >
              <p>{"₹ " + totamo + "/-"}</p>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 20,
            }}
          >
            <p className="header">Delivery Address</p>
            <label htmlFor="loc">
              Location :
              <input
                type="text"
                name="loc"
                id="loc"
                value={changeloc}
                onChange={(e) => {
                  setChangeloc(e.target.value);
                }}
              />
            </label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => {
                  setLocpop(true);
                }}
              >
                {drploc.lat ? "CHANGE COORDINATES" : "GET COORDINATES"}
              </button>
              <button onClick={modifyLoc}>SAVE LOCATION</button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 20,
            }}
          >
            <p className="header" style={{ marginTop: 20 }}>
              Payment method
            </p>
            <label htmlFor="cod">
              <input type="radio" defaultChecked name="payment" id="cod" />
              {"  Cash on Delivery"}
            </label>
            <label htmlFor="cod">
              <input type="radio" disabled name="payment" id="upi" />
              {"  UPI"}
            </label>
            <label htmlFor="cod">
              <input type="radio" disabled name="payment" id="card" />
              {"  Debit/Credit Card"}
            </label>
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 30,
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <NavLink to={"/"}>
              <button>Cancel</button>
            </NavLink>
            <button onClick={handleClick}>Confirm</button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {locpop && (
          <div>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 2,
                height: "100%",
                width: "100%",
                display: "grid",
                placeItems: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: "100%",
                  width: "100%",
                  backdropFilter: "blur(5px)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                onClick={() => {
                  setLocpop(false);
                }}
              ></motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{
                  height: "80%",
                  maxHeight: 600,
                  width: "80%",
                  maxWidth: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  zIndex: 1,
                }}
              >
                <Mapcomp drploc={drploc} setDrploc={setDrploc} />
                <button
                  onClick={() => {
                    setLocpop(false);
                  }}
                >
                  OKAY
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Buynow;
