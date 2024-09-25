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
        top: 90,
        right: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: "#e4e4e4",
        padding: 20,
        border: "1px solid #555555",
      }}
    >
      {msg}
    </motion.div>
  );
};

export default Popup;
