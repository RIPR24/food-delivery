import React, { useContext } from "react";
import { FDfrontContext } from "../App";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import close from "../assets/close.svg";

const Cart = ({ setCartpop }) => {
  const { cart, setCart } = useContext(FDfrontContext);

  const incDish = (e) => {
    const i = e.target.dataset.ind;
    let copy = { ...cart };
    copy.dishes[i].qnt += 1;
    setCart(copy);
  };

  const decDish = (e) => {
    const i = e.target.dataset.ind;
    console.log(i);

    let copy = { ...cart };
    if (copy.dishes[i].qnt === 1) {
      copy.dishes.splice(i, 1);
      if (copy.dishes.length === 0) {
        setCart({});
      } else {
        setCart(copy);
      }
    } else {
      copy.dishes[i].qnt -= 1;
      setCart(copy);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backdropFilter: "blur(5px)",
          zIndex: 0,
        }}
        onClick={() => {
          setCartpop(false);
        }}
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="cart-con"
      >
        <img
          src={close}
          alt=""
          onClick={() => {
            setCartpop(false);
          }}
          style={{ position: "absolute", top: 5, right: 5, cursor: "pointer" }}
        />
        {cart.rest ? (
          <div style={{ width: "95%", height: "95%" }}>
            <p
              style={{ fontSize: "1.2rem", fontWeight: 400, marginBottom: 10 }}
            >
              {"Resturant name: " + cart.rest.name}
            </p>
            <div
              style={{
                height: "84%",
                width: "95%",
                overflowY: "auto",
                scrollbarGutter: "stable",
              }}
            >
              {cart.dishes.map((el, i) => {
                return (
                  <div
                    key={el.name}
                    style={{
                      position: "relative",
                      width: "100%",
                      padding: 6,
                      height: 90,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <img
                      src={el.img}
                      alt=""
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 10,
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <p>{el.name}</p>
                      <p>{"₹ " + el.rate + "/-"}</p>
                    </div>
                    <div className="inc-dec-s">
                      <p
                        data-ind={i}
                        onClick={(e) => {
                          if (el.qnt > 0) {
                            decDish(e);
                          }
                        }}
                      >
                        -
                      </p>
                      <p
                        style={{
                          width: 30,
                          borderLeft: "none",
                          borderRight: "none",
                          cursor: "auto",
                        }}
                      >
                        {el.qnt}
                      </p>
                      <p data-ind={i} onClick={incDish}>
                        +
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                padding: 10,
                gap: 30,
              }}
            >
              <button
                onClick={() => {
                  setCart({});
                }}
              >
                CLEAR
              </button>
              <NavLink
                to={"/buynow"}
                onClick={() => {
                  setCartpop(false);
                }}
              >
                <button style={{ width: "100%" }}>BUY</button>
              </NavLink>
            </div>
          </div>
        ) : (
          <p>No Items in your cart</p>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
