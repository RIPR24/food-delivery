import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../App";
import io from "socket.io-client";

const Orders = () => {
  const [open, setOpen] = useState(false);
  const { cuser, apiUrl, setPop } = useContext(AdminContext);

  let socet;

  function wsCon() {
    try {
      socet = io(apiUrl);
      socet.on("connect", () => {
        console.log(socet.id);
        socet.emit("rest-connect", { rid: cuser.detid, sid: socet.id });
        socet.on("open-success", (msg) => {
          setPop({ stat: true, msg });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {}, []);

  const openRest = async () => {
    wsCon();
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
      {!open && (
        <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
          <p>Open the resturant to recive orders</p>
          <button onClick={openRest}>OPEN</button>{" "}
        </div>
      )}
    </div>
  );
};

export default Orders;
