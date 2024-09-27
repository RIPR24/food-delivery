import React, { useContext } from "react";
import { DelContext } from "./App";
import { motion } from "framer-motion";

const Fullcard = ({ el }) => {
  const { apiUrl } = useContext(DelContext);
  const dat = new Date(el.timeStamp[0]);
  const date = dat.toDateString();
  const time = dat.toLocaleTimeString();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="order-con"
    >
      <div style={{ position: "relative", display: "flex", gap: 10 }}>
        <img
          src={`${apiUrl}${el.cart.rest.img}`}
          alt=""
          style={{
            height: 70,
            width: 70,
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
        <div>
          <p style={{ fontSize: "1.2rem" }}>{el.cart.rest.name}</p>
          <p style={{ color: "#666666" }}>{el.cart.rest.location.name}</p>
        </div>
      </div>
      <div style={{ margin: 20, fontWeight: 500 }}>
        {el.cart.dishes.map((d) => {
          return <p key={d.name}>{d.qnt + " x " + d.name}</p>;
        })}
      </div>
      <div>
        <p style={{ color: "#666666" }}>
          {"Order placed at " + date + ", " + time}
        </p>
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: 500,
          margin: 20,
        }}
      >
        {"₹" + el.totamo + "/-"}
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: 500,
        }}
      >
        TO
      </p>
      <p style={{ fontSize: "1.2rem", fontWeight: 500, textAlign: "right" }}>
        {el.name}
      </p>
      <p style={{ fontSize: "1.2rem", fontWeight: 500, textAlign: "right" }}>
        {el.mobnum}
      </p>
      <p style={{ textAlign: "right" }}>{el.location.name}</p>
    </motion.div>
  );
};

export default Fullcard;
