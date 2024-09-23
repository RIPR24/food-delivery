import { useContext, useEffect, useState } from "react";
import Mapcomp from "../Mapcomp";
import { AnimatePresence } from "framer-motion";
import Rtypelist from "./Rtypelist";
import Menulist from "./Menulist";
import { AdminContext } from "../App";

const ModifyRest = ({ setAdd }) => {
  const [rest, setRest] = useState({});
  const [menu, setMenu] = useState([]);
  const [drploc, setDrploc] = useState({});
  const [getloc, setGetloc] = useState(false);
  const [item, setItem] = useState({});
  const { apiUrl, setPop, cuser } = useContext(AdminContext);
  let role = cuser?.role !== "admin";

  const getRest = async (id) => {
    try {
      const res = await fetch(apiUrl + "rest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setRest(data.rest);
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (role) {
      getRest(cuser.detid);
    }
  }, []);

  useEffect(() => {
    if (rest?.name) {
      document.getElementById("restname").value = rest.name;
      document.getElementById("restlocation").value = rest.location.name;
      document.getElementById("restrat").value = rest.rating;
      setDrploc(rest.location.coor);
      setMenu(rest.types);
    }
  }, [rest]);

  const modifyClick = async () => {
    const inp = document.getElementById("restimg");
    let prename = "";
    if (rest.img.length > 0) {
      prename = rest.img.split("/")[1];
      console.log(prename);
    }

    if (inp.files[0]) {
      var dat = new FormData();
      dat.append("file", inp.files[0]);
      dat.append("rid", rest._id);
      dat.append("prename", prename);

      try {
        const res = await fetch(apiUrl + "rest/upimg", {
          method: "POST",
          body: dat,
        });

        const result = await res.json();
        if (result.status === "success") {
          setPop({ stat: true, msg: " Edited Successfully" });
          setRest(rest);
        } else {
          let msg = result.status;
          setPop({ stat: true, msg });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addrest = async () => {
    const nam = document.getElementById("restname").value;
    const loc = document.getElementById("restlocation").value;
    const rat = document.getElementById("restrat").value;

    let copy = {
      ...rest,
      name: nam,
      location: { name: loc, coor: drploc },
      types: menu,
      rating: rat,
      open: false,
    };

    setRest(copy);
    if (nam.length > 0 && loc.length > 0) {
      try {
        const res = await fetch(apiUrl + "rest/modify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(copy),
        });

        const result = await res.json();
        if (result.status === "success") {
          let msg = " Modified Successfully";
          setPop({ stat: true, msg });
        } else {
          let msg = result.status;
          setPop({ stat: true, msg });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let msg = " Enter Details";
      setPop({ stat: true, msg });
    }
  };

  return (
    <>
      <h1 style={{ margin: "30px", textAlign: "center" }}>MODIFY RESTURANT</h1>
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
          name="dish"
          id="restname"
          placeholder="Name"
          disabled={role}
          className="dect"
        />
        <label style={{ fontSize: "1.3rem" }} htmlFor="restlocation">
          Resturant Location :
        </label>
        <input
          style={{ margin: "0 20px" }}
          type="text"
          name="dish"
          id="restlocation"
          placeholder="Location"
          disabled={role}
          className="dect"
        />

        <label style={{ fontSize: "1.3rem" }}>Resturant Coordinates :</label>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {drploc?.lat ? <p>got location</p> : <p>no location selected</p>}
          <button
            style={{ maxWidth: 200 }}
            disabled={role}
            className="dect"
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
          disabled={role}
          maxLength={2}
          name="dish"
          id="restrat"
          placeholder="Rating"
        />
        <label style={{ fontSize: "1.3rem" }} htmlFor="restimg">
          Resturant Image :
        </label>
        <img
          src={`${apiUrl}${rest?.img}`}
          alt="No Image"
          style={{ height: 50, width: 60, objectFit: "cover" }}
        />
        <input
          style={{ margin: "0 20px" }}
          type="file"
          name="img"
          id="restimg"
        />
        <button onClick={modifyClick} style={{ width: 200 }}>
          UPDATE IMG
        </button>
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
              {drploc?.lat ? (
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
        <button onClick={addrest}>SAVE</button>
      </div>
      {!role && (
        <button
          style={{ position: "absolute", top: 90, right: 30 }}
          onClick={() => {
            setAdd(true);
          }}
        >
          ADD RESTURANT
        </button>
      )}
    </>
  );
};

export default ModifyRest;
