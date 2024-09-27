import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../App";

const Home = () => {
  const { cuser } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cuser._id) {
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div style={{ fontSize: "5rem", marginLeft: 220 }}>
      DASHBOARD IS UNDER PROGRESS
    </div>
  );
};

export default Home;
