import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: 200,
        padding: "100px 30px",
        backgroundColor: "#1a1a1a",
      }}
    >
      <div className="links">
        <NavLink className="nav-el" to={"/home"}>
          HOME
        </NavLink>
        <NavLink className="nav-el" to={"/orders"}>
          ORDERS
        </NavLink>
        <NavLink className="nav-el" to={"/addstuff"}>
          RESTURANT
        </NavLink>
        <NavLink className="nav-el" to={"/foodtype"}>
          FOOD ITEMS
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
