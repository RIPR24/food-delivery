import { motion } from "framer-motion";
import { useEffect } from "react";

const Popup = ({ msg, setPop }) => {
  useEffect(() => {
    setTimeout(() => {
      setPop({ stat: false, msg: "" });
    }, 3000);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: "#353535",
        padding: 20,
      }}
    >
      {msg}
    </motion.div>
  );
};

export default Popup;
