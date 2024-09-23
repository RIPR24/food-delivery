import { useContext, useState } from "react";
import Mapcomp from "../Mapcomp";
import { AnimatePresence } from "framer-motion";
import Rtypelist from "./Rtypelist";
import Menulist from "./Menulist";
import { AdminContext } from "../App";

const Addrest = ({ setAdd }) => {
  const [menu, setMenu] = useState([]);
  const [drploc, setDrploc] = useState({});
  const [getloc, setGetloc] = useState(false);
  const [item, setItem] = useState({});
  const { apiUrl, setPop } = useContext(AdminContext);

  const addrest = async () => {
    const nam = document.getElementById("restname").value;
    const loc = document.getElementById("restlocation").value;
    const rat = document.getElementById("restrat").value;
    const inp = document.getElementById("restimg");
    if (nam.length > 0 && loc.length > 0) {
      if (inp.files[0]) {
        var dat = new FormData();
        dat.append("file", inp.files[0]);
        dat.append("name", nam);
        dat.append("locname", loc);
        dat.append("loccoor", JSON.stringify(drploc));
        dat.append("menu", JSON.stringify(menu));
        dat.append("rat", rat);

        console.log(inp.files[0]);

        try {
          const res = await fetch(apiUrl + "rest/create", {
            method: "POST",
            body: dat,
          });

          const result = await res.json();
          if (result.status === "success") {
            let msg = " Added Successfully";
            setPop({ stat: true, msg });
            console.log(result.rest);
          } else {
            let msg = result.status;
            setPop({ stat: true, msg });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setPop({ stat: true, msg: "select a picture" });
      }
    } else {
      setPop({ stat: true, msg: "ENTER DETAILS" });
    }
  };

  return (
    <>
      <h1 style={{ margin: "30px", textAlign: "center" }}>ADD RESTURANT</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          width: "80%",
          maxWidth: 800,
          rowGap: 30,
          columnGap: 50,
          margin: "auto",
          textAlign: "right",
        }}
      >
        <label style={{ fontSize: "1.3rem" }} htmlFor="restname">
          Resturant Name :
        </label>
        <input
          style={{ margin: "0 20px" }}
          type="text"
          autoComplete="off"
          name="dish"
          id="restname"
          placeholder="Name"
        />
        <label style={{ fontSize: "1.3rem" }} htmlFor="restlocation">
          Resturant Location :
        </label>
        <input
          style={{ margin: "0 20px" }}
          type="text"
          name="dish"
          autoComplete="off"
          id="restlocation"
          placeholder="Location"
        />

        <label style={{ fontSize: "1.3rem" }}>Resturant Coordinates :</label>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {drploc.lat ? <p>got location</p> : <p>no location selected</p>}
          <button
            style={{ maxWidth: 200 }}
            onClick={() => {
              setGetloc(!getloc);
            }}
          >
            GET COORDINATES
          </button>
        </div>
        <label style={{ fontSize: "1.3rem" }} htmlFor="restrat">
          Resturant Rating :
        </label>
        <input
          style={{ margin: "0 20px" }}
          type="number"
          min={1}
          max={5}
          autoComplete="off"
          maxLength={2}
          name="dish"
          id="restrat"
          placeholder="Rating"
        />
        <label style={{ fontSize: "1.3rem" }} htmlFor="restimg">
          Resturant Image :
        </label>
        <input
          style={{ margin: "0 20px" }}
          type="file"
          name="img"
          id="restimg"
        />
      </div>
      <AnimatePresence>
        {getloc && (
          <>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
              }}
              onClick={() => {
                setGetloc(false);
              }}
            ></div>
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
                width: "80%",
                height: "70%",
                maxWidth: 1000,
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Mapcomp setDrploc={setDrploc} drploc={drploc} />
              {drploc.lat ? (
                <button
                  style={{ width: "15%" }}
                  onClick={() => {
                    setGetloc(false);
                  }}
                >
                  Okay
                </button>
              ) : (
                <button
                  style={{ width: "15%", cursor: "not-allowed" }}
                  className="dect"
                >
                  Okay
                </button>
              )}
            </div>
          </>
        )}
      </AnimatePresence>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 50,
          gap: 30,
        }}
      >
        <h2>MENU</h2>
        <Rtypelist
          menu={menu}
          setMenu={setMenu}
          item={item}
          setItem={setItem}
        />
        <Menulist menu={menu} setMenu={setMenu} setItem={setItem} />
        <button onClick={addrest}>ADD RESTURANT</button>
      </div>
      <button
        style={{ position: "absolute", top: 90, right: 30 }}
        onClick={() => {
          setAdd(false);
        }}
      >
        MODIFY RESTURANT
      </button>
    </>
  );
};

export default Addrest;
