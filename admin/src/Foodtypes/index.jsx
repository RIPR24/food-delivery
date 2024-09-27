import { useNavigate } from "react-router-dom";
import { AdminContext } from "../App";
import Addrtype from "./Addrtype";
import { useContext, useEffect } from "react";

const Foodtypes = () => {
  const navigate = useNavigate();
  const { cuser } = useContext(AdminContext);

  useEffect(() => {
    if (cuser._id) {
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: 150,
        width: "100%",
        height: 100,
      }}
    >
      <Addrtype />
    </div>
  );
};

export default Foodtypes;
