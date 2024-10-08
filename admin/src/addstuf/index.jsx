import { useEffect, useContext } from "react";
import "./add.css";
import Restsel from "./Restsel";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../App";

const Add = () => {
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
      <Restsel />
    </div>
  );
};
export default Add;
