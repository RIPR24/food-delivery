import { createContext, useState } from "react";
import Nav from "./Nav";
import { Outlet, ScrollRestoration } from "react-router-dom";

export const DelContext = createContext();

const App = () => {
  const [cuser, setCuser] = useState({});
  const [socket, setSocket] = useState();
  const [allunpickedorders, setAllunpickedorders] = useState([]);
  const apiUrl = "http://localhost:4000/";

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
      }}
    >
      {cuser._id && <Nav />}
      <Outlet />
      <ScrollRestoration />
    </DelContext.Provider>
  );
};

export default App;
