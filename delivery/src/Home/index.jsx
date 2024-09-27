import React, { useContext, useEffect, useState } from "react";
import { DelContext } from "../App";
import { useNavigate } from "react-router-dom";
import Ordrel from "./Ordrel";
import Mapcomp from "./Mapcomp";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const Home = () => {
  const { cuser, socket, allunpickedorders, setAllunpickedorders } =
    useContext(DelContext);
  const navigate = useNavigate();
  const [fillteredorders, setFilteredorders] = useState(allunpickedorders);
  const [temp, setTemp] = useState({});

  useEffect(() => {
    if (cuser?._id) {
      socket.emit("get-orders", {});
      socket.on("unpicked-orders", (arr) => {
        setAllunpickedorders(arr);
        setFilteredorders(arr);
      });
    } else {
      navigate("/");
    }
  }, []);

  const handleClick = (e) => {
    setTemp(fillteredorders[e.target.dataset.ind]);
  };

  const acceptDelivery = () => {
    socket.emit("del-order-select", { oid: temp._id, delid: cuser._id });
    setRefresh(true);
    setTemp({});
    navigate("/restpck");
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 100,
      }}
    >
      <div className="home-con">
        {fillteredorders.map((el, i) => {
          return (
            <div key={i} data-ind={i} onClick={handleClick}>
              <Ordrel obj={el} ind={i} />
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {temp._id && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1,
              height: "100vh",
              width: "100%",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backdropFilter: "blur(5px)",
              }}
              onClick={() => {
                setTemp({});
              }}
            ></motion.div>
            <div
              style={{
                width: 900,
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
              }}
            >
              <Mapcomp temp={temp} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 40,
                }}
              >
                <button onClick={acceptDelivery}>ACCEPT</button>
                <button
                  onClick={() => {
                    setTemp({});
                  }}
                >
                  CANCEL
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
