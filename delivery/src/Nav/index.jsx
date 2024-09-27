import React, { useState } from "react";
import Sidebar from "./Sidebar";
import hambrgr from "../assets/hambrgr.svg";
import { AnimatePresence } from "framer-motion";

const Nav = () => {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <div
        className="float-nav"
        style={{ zIndex: 1, position: "fixed", top: 0, left: 0, width: "100%" }}
      >
        <div
          style={{
            width: "100%",
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#242424",
          }}
        >
          <img
            src={hambrgr}
            onClick={() => {
              setExpand(!expand);
            }}
            alt=""
            style={{
              zIndex: 1,
            }}
          />
        </div>
        <AnimatePresence>
          {expand && (
            <div style={{ zIndex: 1 }}>
              <Sidebar setExpand={setExpand} />
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="fixed-nav">
        <Sidebar />
      </div>
    </div>
  );
};

export default Nav;
