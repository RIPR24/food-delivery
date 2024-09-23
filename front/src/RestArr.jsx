import { useContext, useEffect, useState } from "react";
import { FDfrontContext } from "./App";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const RestArr = () => {
  const { apiUrl, restfilter, opnrest } = useContext(FDfrontContext);

  const [arr, setArr] = useState(opnrest);

  useEffect(() => {
    if (restfilter.type) {
      if (restfilter.type === "rtype") {
        const copy = opnrest.filter((el) => {
          let match = false;
          el.types.forEach((d) => {
            if (d.name === restfilter.name) {
              match = true;
              return el;
            }
          });
          if (match) {
            return el;
          }
        });
        setArr(copy);
      } else if (restfilter.type === "dish") {
        const copy = opnrest.filter((el) => {
          let match = false;
          el.types.forEach((d) => {
            d.dishes.forEach((po) => {
              if (po.name === restfilter.name) {
                match = true;
                return el;
              }
            });
            if (match) {
              return el;
            }
          });
          if (match) {
            return el;
          }
        });
        setArr(copy);
      }
    }
  }, [restfilter]);

  const getCol = (rat) => {
    if (rat > 4.5) {
      return "#0e6121";
    } else if (rat >= 3.5) {
      return "#04ba2e";
    } else if (rat > 2.5) {
      return "#c4c704";
    } else {
      return "#eba307";
    }
  };

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}
    >
      {arr.map((el, i) => {
        let types = "";
        const count = el.types.length;
        for (let i = 0; i < count && i < 3; i++) {
          if (i > 0) {
            types += ",";
          }
          types += el.types[i].name;
        }

        if (count > 3) {
          types += "...";
        }
        return (
          <NavLink key={i} to={`/rest/:${el._id}`}>
            <div className="rest-el">
              <motion.img
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ width: "90%", borderRadius: 15, marginBottom: 10 }}
                src={`${apiUrl}${el.img}`}
                loading="lazy"
                alt=""
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  padding: "0 20px",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "1.25rem",
                    color: "#242424",
                  }}
                >
                  {el.name}
                </p>
                <p
                  style={{
                    fontSize: ".9rem",
                    color: "aliceblue",
                    backgroundColor: getCol(el.rating),
                    padding: "0 5px",
                    height: 20,
                    borderRadius: 5,
                  }}
                >
                  {el.rating}
                </p>
              </div>
              <p
                style={{ color: "#808080", fontSize: "1.15rem", width: "80%" }}
              >
                {types}
              </p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default RestArr;
