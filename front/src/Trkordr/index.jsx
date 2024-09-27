import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { FDfrontContext } from "../App";
import { useEffect } from "react";
import Maptrk from "./Maptrk";

const Trkordr = () => {
  const { socket, trkel } = useContext(FDfrontContext);
  const [pos, setPos] = useState({});

  useEffect(() => {
    socket.on(trkel.deluid, (obj) => {
      setPos(obj);
    });
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        placeItems: "center",
        marginTop: 100,
      }}
    >
      <Maptrk home={trkel.location.coor} pos={pos} />
    </div>
  );
};

export default Trkordr;
