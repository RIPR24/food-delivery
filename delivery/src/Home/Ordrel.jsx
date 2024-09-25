import { motion } from "framer-motion";

const Ordrel = ({ obj, ind }) => {
  const pri = Math.floor(+obj.totamo * 0.07) + 40;
  return (
    <motion.div
      className="ordrel"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      data-ind={ind}
    >
      <p data-ind={ind}>{obj.cart.rest.name}</p>
      <p data-ind={ind}>{obj.cart.rest.location.name}</p>
      <p data-ind={ind} style={{ textAlign: "right" }}>
        {obj.name}
      </p>
      <p data-ind={ind} style={{ textAlign: "right" }}>
        {obj.location.name}
      </p>
      <p data-ind={ind} style={{ textAlign: "center", fontSize: "1.4rem" }}>
        {"Pay: ₹" + pri + "/-"}
      </p>
    </motion.div>
  );
};

export default Ordrel;
