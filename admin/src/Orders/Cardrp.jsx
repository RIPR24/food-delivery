import { motion } from "framer-motion";

const Cardrp = ({ obj, ind }) => {
  return (
    <motion.div
      className="ordrel"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      data-ind={ind}
    >
      <p data-ind={ind}>{obj.cart.rest.name}</p>
      <div style={{ margin: 20, fontWeight: 500 }}>
        {obj.cart.dishes.map((d) => {
          return <p key={d.name}>{d.qnt + " x " + d.name}</p>;
        })}
      </div>
      <p>FOR</p>
      <p data-ind={ind} style={{ textAlign: "right" }}>
        {obj.name}
      </p>
      <p data-ind={ind} style={{ textAlign: "right" }}>
        {obj.mobnum}
      </p>
    </motion.div>
  );
};

export default Cardrp;
