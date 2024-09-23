import React, { useContext, useEffect, useState } from "react";
import { DelContext } from "../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { cuser, socket, allunpickedorders, setAllunpickedorders } =
    useContext(DelContext);
  const navigate = useNavigate();
  const [fillteredorders, setFilteredorders] = useState(allunpickedorders);
  useEffect(() => {
    if (cuser?._id) {
      socket.emit("get-orders", {});
      socket.on("unpicked-orders", (arr) => {
        setAllunpickedorders(arr);
        console.log(arr);
      });
    } else {
      navigate("/");
    }
  }, []);

  return <div>Home yo</div>;
};

export default Home;
