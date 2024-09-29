import React, { useContext, useState } from "react";
import "./nav.css";
import Srchbar from "./Srchbar";
import profile from "../assets/user.svg";
import cartimg from "../assets/cart.svg";
import logo from "../assets/food-logo.svg";
import { FDfrontContext } from "../App";
import { NavLink } from "react-router-dom";
import LogPop from "../LogPop";
import { AnimatePresence } from "framer-motion";
import Cart from "./Cart";

const Nav = () => {
  const { cart, logp, setLogp, setRestfilter, user, setPop } =
    useContext(FDfrontContext);
  const [cartpop, setCartpop] = useState(false);
  const cartClk = () => {
    if (user._id) {
      setCartpop(!cartpop);
    } else {
      setPop({ stat: true, msg: "Login to continue!!" });
      setLogp(true);
    }
  };
  return (
    <>
      <div className="navbar">
        <NavLink to={"/"}>
          <div
            style={{ position: "relative" }}
            onClick={() => {
              setRestfilter({});
            }}
          >
            <img src={logo} alt="" />
            <p className="logo">
              FAST <span style={{ color: "#15ed52" }}>DELIVERY</span>
            </p>
          </div>
        </NavLink>
        <Srchbar />
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ position: "relative" }}>
            <img
              src={cartimg}
              onClick={cartClk}
              style={{ cursor: "pointer" }}
              alt=""
            />
            {cart.dishes?.length > 0 && (
              <p
                style={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                  backgroundColor: "#1C274C",
                  color: "aliceblue",
                  padding: "0 6px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={cartClk}
              >
                {cart.dishes.length}
              </p>
            )}
          </div>
          <img
            src={profile}
            alt=""
            onClick={() => {
              setLogp(!logp);
            }}
          />
        </div>
      </div>
      <AnimatePresence>
        {cartpop && <Cart setCartpop={setCartpop} />}
      </AnimatePresence>
      <AnimatePresence>{logp && <LogPop />}</AnimatePresence>
    </>
  );
};

export default Nav;
