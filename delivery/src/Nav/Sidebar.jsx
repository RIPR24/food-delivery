import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = ({ setExpand }) => {
  const handleClick = () => {
    if (setExpand) {
      setExpand(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        maxWidth: 300,
        backgroundColor: "#151515",
        borderRadius: 5,
        justifyContent: "space-evenly",
        alignItems: "center",
        transformOrigin: "left top",
        zIndex: 2,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NavLink onClick={handleClick} to={"/home"}>
          Home
        </NavLink>
        <NavLink onClick={handleClick} to={"/restpck"}>
          Reasturant Pickup
        </NavLink>
        <NavLink onClick={handleClick} to={"/droploc"}>
          Drop Location
        </NavLink>
      </div>
    </motion.div>
  );
};

export default Sidebar;
