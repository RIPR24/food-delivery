import { useState } from "react";
import Addrest from "./Addrest";
import ModifyRest from "./ModifyRest";

const Restsel = () => {
  const [add, setAdd] = useState(false);
  return (
    <div>
      {add ? <Addrest setAdd={setAdd} /> : <ModifyRest setAdd={setAdd} />}
    </div>
  );
};

export default Restsel;
