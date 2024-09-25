import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        flexDirection: "column",
        height: "100vh",
        width: "90%",
        maxWidth: 300,
        backgroundColor: "#151515",
        borderRadius: 20,
        justifyContent: "space-evenly",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NavLink to={"/home"}>Home</NavLink>
        <NavLink to={"/restpck"}>Reasturant Pickup</NavLink>
        <NavLink to={"/droploc"}>Drop Location</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
