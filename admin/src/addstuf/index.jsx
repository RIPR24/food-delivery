import { useState, useEffect, useContext } from "react";
import Addrtype from "./Addrtype";
import "./add.css";
import Restsel from "./Restsel";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../App";

const Add = () => {
  const [rest, setRest] = useState(true);
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
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          margin: "20px 0",
        }}
      >
        <p
          className={rest ? "adbtn" : "adbtn adact"}
          style={{ fontSize: "1.3rem", cursor: "pointer" }}
          onClick={() => {
            setRest(false);
          }}
        >
          Food types
        </p>
        <p
          className={rest ? "adbtn adact" : "adbtn"}
          style={{ fontSize: "1.3rem", cursor: "pointer" }}
          onClick={() => {
            setRest(true);
          }}
        >
          Resturant
        </p>
      </div>
      {rest ? <Restsel /> : <Addrtype />}
    </div>
  );
};
export default Add;
