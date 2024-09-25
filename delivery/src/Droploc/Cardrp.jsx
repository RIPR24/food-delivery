import { motion } from "framer-motion";

const Cardrp = ({ obj, ind }) => {
  return (
    <motion.div
      className="ordrel"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      data-ind={ind}
    >
      <p data-ind={ind}>{obj.name}</p>
      <p data-ind={ind}>{obj.mobnum}</p>
      <p data-ind={ind}>{obj.location.name}</p>
      <p data-ind={ind}>{"Total amount : ₹" + obj.totamo}</p>
    </motion.div>
  );
};

export default Cardrp;
