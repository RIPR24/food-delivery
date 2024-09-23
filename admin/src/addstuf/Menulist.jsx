import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import bin from "../assets/delete.svg";
import edit from "../assets/edit.svg";

const Menulist = ({ menu, setMenu, setItem }) => {
  const [mover, setMover] = useState(false);

  function delEl(e) {
    const copy = [...menu].filter((el) => el.name !== e.target.dataset.ind);
    setMenu(copy);
  }

  function modEl(e) {
    const fin = menu.find((el) => el.name === e.target.dataset.ind);
    const newel = fin.dishes.map((el) => el.name);
    setItem({ name: fin.name, dishes: newel, olddishes: fin.dishes });

    const copy = menu.filter((el) => el.name !== e.target.dataset.ind);
    setMenu(copy);
  }

  return (
    <div
      className="menu_el"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        width: "90%",
        maxWidth: 1200,
        padding: 20,
      }}
    >
      {menu.map((el, i) => {
        return (
          <div
            key={i}
            style={{ position: "relative" }}
            onMouseMove={() => {
              setMover(true);
            }}
            onMouseLeave={() => {
              setMover(false);
            }}
          >
            <p style={{ fontSize: "1.5rem", margin: 10 }}>{el.name}</p>

            {el.dishes.map((ele, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "300px 150px 25px",
                    marginLeft: 40,
                    marginBottom: 2,
                  }}
                >
                  <p>{ele.name}</p>
                  <p style={{ marginLeft: 20 }}>{ele.price + "/-"}</p>
                  <p className={ele.isveg ? "veg" : "nonveg"}></p>
                </div>
              );
            })}
            <AnimatePresence>
              {mover && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ position: "absolute", top: 5, right: 5 }}
                >
                  <img src={bin} data-ind={el.name} alt="" onClick={delEl} />
                  <img src={edit} data-ind={el.name} alt="" onClick={modEl} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Menulist;
