import { useContext, useEffect, useState } from "react";
import { DelContext } from "../App";
import Cardrp from "./Cardrp";
import { AnimatePresence, motion } from "framer-motion";
import hambrgr from "../assets/hambrgr.svg";
import DrpMap from "../DrpMap";
import { useNavigate } from "react-router-dom";
import Fullcard from "../Fullcard";

const Droploc = () => {
  const { delarr, cuser, socket, setRefresh } = useContext(DelContext);
  const [arrpop, setArrpop] = useState(false);
  const [temp, setTemp] = useState({});
  const navigate = useNavigate();
  const rearr = delarr.map((el) => {
    return {
      location: el.location,
      type: "home",
      name: el.name,
    };
  });
  const [arr, setArr] = useState(rearr);

  const handleClick = (e) => {
    setTemp(delarr[e.target.dataset.ind]);
  };

  const ordrDelivered = () => {
    socket.emit("del-ordr-delivered", { oid: temp._id, delid: cuser._id });
    socket.on("del-delivered-res", (st) => {
      if (st === "success") {
        setRefresh(true);
        navigate("/home");
      } else {
        alert(st);
      }
    });
  };

  useEffect(() => {
    if (cuser?._id) {
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <img
        src={hambrgr}
        onClick={() => {
          setArrpop(!arrpop);
        }}
        alt=""
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          backgroundColor: "#353535",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      <AnimatePresence>
        {arrpop && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{
              width: 300,
              transformOrigin: "top left",
              position: "absolute",
              top: 100,
              left: 50,
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {delarr.map((el, i) => {
              return (
                <div onClick={handleClick} key={i}>
                  <Cardrp obj={el} ind={i} />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        style={{
          zIndex: 0,
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
      >
        <DrpMap arr={arr} />
      </div>
      <AnimatePresence>
        {temp._id && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1,
              height: "100%",
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
                width: 400,
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
              }}
            >
              <Fullcard el={temp} />
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
                <button onClick={ordrDelivered}>DELIVERED</button>
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

export default Droploc;
