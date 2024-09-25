import { motion } from "framer-motion";

const Cardrp = ({ obj, ind }) => {
  return (
    <motion.div
      className="ordrel"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      data-ind={ind}
    >
      <p data-ind={ind}>{obj.cart.rest.name}</p>
      <p data-ind={ind}>{obj.cart.rest.location.name}</p>
      <div style={{ margin: 20, fontWeight: 500 }}>
        {obj.cart.dishes.map((d) => {
          return <p key={d.name}>{d.qnt + " x " + d.name}</p>;
        })}
      </div>
    </motion.div>
  );
};

export default Cardrp;
