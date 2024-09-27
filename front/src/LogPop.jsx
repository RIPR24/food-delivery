import React, { useContext, useState } from "react";
import { FDfrontContext } from "./App";
import logo from "./assets/food-logo.svg";
import { motion } from "framer-motion";
import Mapcomp from "./Mapcomp";
import { NavLink } from "react-router-dom";

const LogPop = () => {
  const { logp, setLogp, user, setUser, apiUrl, loginUser, socket, setPop } =
    useContext(FDfrontContext);
  const [signup, setSignup] = useState(false);
  const [drploc, setDrploc] = useState(user?.defloc?.coor || {});
  const [locpop, setLocpop] = useState(false);
  const [changeloc, setChangeloc] = useState(user?.defloc?.name || "");

  const login = async () => {
    const mono = document.getElementById("mono").value;
    const password = document.getElementById("pass").value;

    const status = await loginUser(mono, password);
    if (status === "success") {
      localStorage.setItem("user-cred", JSON.stringify({ mono, password }));
    }
  };

  const logout = async () => {
    setUser({});
    localStorage.setItem(
      "user-cred",
      JSON.stringify({ mono: "", password: "" })
    );
    setLogp(false);
  };

  const modifyLoc = () => {
    if (drploc.lat) {
      socket.emit("user-change-loc", {
        uid: user._id,
        defloc: { name: changeloc, coor: drploc },
      });
    } else {
      setPop({ stat: true, msg: "Select Coordinate" });
    }
  };

  const signUser = async () => {
    const mono = document.getElementById("mono").value;
    const name = document.getElementById("name").value;
    const loc = document.getElementById("loc").value;
    const password = document.getElementById("pass").value;

    if (
      password.length > 3 &&
      mono.toString().length === 5 &&
      name.length > 0
    ) {
      const res = await fetch(apiUrl + "user/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mono,
          password,
          name,
          location: { name: loc, coor: drploc },
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        const status = await loginUser(mono, password);
        if (status === "success") {
          localStorage.setItem("user-cred", JSON.stringify({ mono, password }));
        }
      }
    } else {
      alert("Enter correct data");
    }
  };

  return (
    <>
      {user.name ? (
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
              setLogp(false);
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
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              gap: 20,
              alignItems: "center",
              zIndex: 1,
              backgroundColor: "white",
              border: "1px solid #999999",
              borderRadius: 10,
            }}
          >
            <div style={{ position: "relative", marginBottom: 50 }}>
              <img src={logo} alt="" />
              <p style={{ translate: "-150px 50px" }} className="logo">
                FAST <span style={{ color: "#15ed52" }}>DELIVERY</span>
              </p>
            </div>
            <p>{"Welcome back " + user.name}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
              <button
                onClick={() => {
                  setLocpop(true);
                }}
              >
                {drploc.lat ? "CHANGE COORDINATES" : "GET COORDINATES"}
              </button>
            </div>
            <button onClick={modifyLoc}>SAVE LOCATION</button>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <NavLink
                onClick={() => {
                  setLogp(false);
                }}
                to={"/orders"}
              >
                <button>ORDERS</button>
              </NavLink>
              <button onClick={logout}>LOGOUT</button>
            </div>
          </motion.div>
        </div>
      ) : (
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
              setLogp(false);
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
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              gap: 20,
              alignItems: "center",
              zIndex: 1,
              backgroundColor: "white",
              border: "1px solid #999999",
              borderRadius: 10,
            }}
          >
            <div style={{ position: "relative", marginBottom: 50 }}>
              <img src={logo} alt="" />
              <p style={{ translate: "-150px 50px" }} className="logo">
                FAST <span style={{ color: "#15ed52" }}>DELIVERY</span>
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "35% 65%",
                gap: 10,
                width: "80%",
                textAlign: "right",
              }}
            >
              <label htmlFor="mono">Mobile No. :</label>
              <input type="number" name="monum" id="mono" />
              <label htmlFor="pass">PASSWORD:</label>
              <input type="password" name="pass" id="pass" />
              {signup && (
                <>
                  <label htmlFor="name">Name :</label>
                  <input type="text" name="name" id="name" />
                  <label htmlFor="pass">Location :</label>
                  <input type="text" name="loc" id="loc" />
                </>
              )}
            </div>
            {signup && (
              <button
                onClick={() => {
                  setLocpop(true);
                }}
              >
                {drploc.lat ? "CHANGE COORDINATES" : "GET COORDINATES"}
              </button>
            )}
            {signup ? (
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button onClick={signUser}>SIGN UP</button>
                <button
                  onClick={() => {
                    setSignup(false);
                  }}
                >
                  LOGIN
                </button>
              </div>
            ) : (
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  onClick={() => {
                    setSignup(true);
                  }}
                >
                  SIGN UP
                </button>
                <button onClick={login}>LOGIN</button>
              </div>
            )}
            <p style={{ color: "gray", textAlign: "center", width: "70%" }}>
              * By Continuing you agree to the{" "}
              <span style={{ color: "aqua", cursor: "pointer" }}>
                Terms of Services
              </span>{" "}
              and
              <span style={{ color: "aqua", cursor: "pointer" }}>
                {" "}
                Privacy policy
              </span>
              .
            </p>
          </motion.div>
        </div>
      )}
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
    </>
  );
};

export default LogPop;
