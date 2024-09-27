import { createContext, useState, useEffect } from "react";
import Nav from "./Nav";
import { Outlet, ScrollRestoration } from "react-router-dom";

export const DelContext = createContext();

const App = () => {
  const [cuser, setCuser] = useState({});
  const [socket, setSocket] = useState();
  const [restpick, setRestpick] = useState([]);
  const [delarr, setDelarr] = useState([]);
  const [allunpickedorders, setAllunpickedorders] = useState([]);
  const apiUrl = "https://food-delivery-api-uael.onrender.com/";
  const [pos, setPos] = useState({});
  const [refresh, setRefresh] = useState(false);

  const getCurpos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coor = { lat: latitude, lng: longitude };
          setPos(coor);
          socket.emit("del-cur-loc", { coor, delid: cuser._id });
        },
        (err) => {},
        {
          enableHighAccuracy: true,
        }
      );
    }
    setTimeout(() => {
      getCurpos();
    }, 2000);
  };

  useEffect(() => {
    if (socket) {
      getCurpos();
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      if (refresh) {
        socket.emit("del-refresh", { delid: cuser._id });
      }
      socket.on("del-ref-res", (obj) => {
        setRestpick(obj.filter((el) => el.status < 2));
        setDelarr(obj.filter((el) => el.status === 2));
      });
    }
  }, [refresh]);

  return (
    <DelContext.Provider
      value={{
        cuser,
        setCuser,
        socket,
        setSocket,
        apiUrl,
        allunpickedorders,
        setAllunpickedorders,
        restpick,
        setRestpick,
        delarr,
        setDelarr,
        pos,
        setPos,
        setRefresh,
      }}
    >
      <div style={{ display: "flex" }}>
        {cuser._id && <Nav />}
        <Outlet />
        <ScrollRestoration />
      </div>
    </DelContext.Provider>
  );
};

export default App;
