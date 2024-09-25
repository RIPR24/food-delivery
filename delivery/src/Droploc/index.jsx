import { useContext, useEffect, useState } from "react";
import { DelContext } from "../App";
import Cardrp from "./Cardrp";
import { AnimatePresence, motion } from "framer-motion";
import hambrgr from "../assets/hambrgr.svg";
import DrpMap from "../DrpMap";
import { useNavigate } from "react-router-dom";

const Droploc = () => {
  const { delarr, setDelarr, cuser } = useContext(DelContext);
  const [arrpop, setArrpop] = useState(false);
  const navigate = useNavigate();
  const rearr = delarr.map((el) => {
    return {
      location: el.location,
      type: "rest",
      name: el.name,
    };
  });
  const [arr, setArr] = useState(rearr);

  useEffect(() => {
    if (cuser?._id) {
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <img
        src={hambrgr}
        onClick={() => {
          setArrpop(!arrpop);
        }}
        alt=""
        style={{
          position: "absolute",
          top: 50,
          left: 350,
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
              left: 350,
              zIndex: 1,
            }}
          >
            {delarr.map((el, i) => {
              return (
                <div key={i}>
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
          left: 300,
          height: "100vh",
          width: "80%",
        }}
      >
        <DrpMap arr={arr} />
      </div>
    </div>
  );
};

export default Droploc;
