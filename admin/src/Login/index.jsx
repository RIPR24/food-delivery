import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AdminContext } from "../App";

const Login = () => {
  const { apiUrl, setCuser, cuser } = useContext(AdminContext);
  const navigate = useNavigate();
  const [prob, setProb] = useState("");
  const [load, setLoad] = useState(false);

  const loginUser = async (username, password, ret) => {
    const res = await fetch(apiUrl + "cuser/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.status === "success") {
      setProb("");
      setCuser(data.user);
      if (ret) {
        return data;
      } else {
        navigate("/home");
      }
    } else {
      setProb(data.status);
      if (load) {
        setLoad(false);
      }
    }
  };

  const login = async () => {
    const username = document.getElementById("usrname").value;
    const password = document.getElementById("password").value;

    const status = await loginUser(username, password, true);
    if (status.status === "success" && status.user.role !== "del") {
      localStorage.setItem(
        "cuser-admin-cred",
        JSON.stringify({ username, password })
      );
      navigate("/home");
    }
  };

  // useEffect(() => {
  //   if (cuser._id) {
  //     navigate("/home");
  //   } else {
  //     const datal = localStorage.getItem("cuser-admin-cred");
  //     if (datal) {
  //       const dat = JSON.parse(datal);
  //       loginUser(dat.username, dat.password, false);
  //     } else {
  //       setLoad(false);
  //     }
  //   }
  // }, []);

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      {load ? (
        <AnimatePresence>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading...
          </motion.p>
        </AnimatePresence>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "33% 67%",
            gap: 30,
            textAlign: "right",
            borderRadius: 20,
            backgroundColor: "#353535",
            padding: 50,
            width: "90%",
            maxWidth: 450,
          }}
        >
          <label htmlFor="usrname">User Name : </label>
          <input type="text" autoComplete="off" id="usrname" />
          <label htmlFor="password">Password : </label>
          <input type="password" id="password" />
          <p
            style={{ gridColumn: "span 2", textAlign: "center", color: "red" }}
          >
            {prob}
          </p>
          <button onClick={login}>Login</button>
          <button disabled className="dect">
            Forgot Password
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
