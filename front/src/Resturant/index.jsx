import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FDfrontContext } from "../App";

const Rest = () => {
  const { apiUrl, cart, setCart } = useContext(FDfrontContext);
  const { restid } = useParams();
  const [rest, setRest] = useState({});

  const getData = async (str) => {
    const res = await fetch(apiUrl + "rest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ _id: str }),
    });
    const data = await res.json();
    if (data.status === "success") {
      setRest(data.rest);
    }
  };

  const incDish = (e) => {
    const obj = e.target.dataset;
    let copy = { ...cart };
    if (cart.rest) {
      if (cart.rest._id !== rest._id) {
        alert("Please Order from a single resturant");
      } else {
        if (cart.dishes) {
          let add = true;
          cart.dishes.forEach((el, i) => {
            if (el.name === obj.name) {
              copy.dishes[i].qnt += 1;
              setCart({ ...copy });
              add = false;
            }
          });
          if (add) {
            copy.dishes.push({ ...obj, qnt: 1 });
            setCart({ ...copy });
          }
        }
      }
    } else {
      setCart({ rest: { ...rest, types: [] }, dishes: [{ ...obj, qnt: 1 }] });
    }
  };

  const decDish = (e) => {
    const obj = e.target.dataset;
    let copy = { ...cart };
    cart.dishes.forEach((el, i) => {
      if (el.name === obj.name) {
        if (copy.dishes[i].qnt === 1) {
          copy.dishes.splice(i, 1);
        } else {
          copy.dishes[i].qnt -= 1;
        }
        if (copy.dishes.length === 0) {
          setCart({});
        } else {
          setCart({ ...copy });
        }
      }
    });
  };

  useEffect(() => {
    let str = restid;
    if (restid.charAt(0) === ":") {
      str = str.substring(1);
    }
    getData(str);
  }, []);
  let types = "";
  if (rest.name) {
    const count = rest.types.length;
    for (let i = 0; i < count && i < 8; i++) {
      if (i > 0) {
        types += ",";
      }
      types += rest.types[i].name;
    }

    if (count > 8) {
      types += "...";
    }
  }

  return (
    <div
      style={{
        marginTop: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {rest.name ? (
        <div className="rest-con">
          <img
            src={`${apiUrl}${rest.img}`}
            alt=""
            style={{ objectFit: "cover", height: 400, borderRadius: 10 }}
          />
          <div style={{ position: "sticky" }}>
            <p className="rest-name">{rest.name.toUpperCase()}</p>
            <p className="rest-p">{types}</p>
            <p className="rest-p">{rest.location.name}</p>
          </div>
          <div className="rest-menu">
            <p style={{ fontSize: "2rem", gridColumn: "span 2" }}>MENU</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                scrollbarWidth: "none",
                gap: 5,
                borderRight: "1px solid #999999",
              }}
            >
              {rest.types.map((el, i) => {
                return (
                  <a key={i} className="menu-a" href={`#menu-${el.name}`}>
                    {el.name + " (" + el.dishes.length + ")"}
                  </a>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                scrollbarWidth: "none",
                gap: 5,
              }}
            >
              {rest.types.map((el, i) => {
                return (
                  <div key={i}>
                    <p id={"menu-" + el.name} style={{ fontSize: "1.8rem" }}>
                      {el.name}
                    </p>
                    {el.dishes.map((d) => {
                      let count = 0;
                      if (cart?.dishes) {
                        cart.dishes.forEach((dis) => {
                          if (dis.name === d.name) {
                            count = dis.qnt;
                          }
                        });
                      }
                      return (
                        <div
                          className="menu-b"
                          key={d.name}
                          style={{
                            position: "relative",
                            display: "flex",
                          }}
                        >
                          <img
                            src={d.img}
                            loading="lazy"
                            style={{
                              height: 100,
                              width: 100,
                              borderRadius: 10,
                              marginRight: 20,
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                          {d.isveg ? (
                            <p className="veg vpos"></p>
                          ) : (
                            <p className="nonveg vpos"></p>
                          )}
                          <div>
                            <p style={{ fontSize: "1.2rem", fontWeight: 500 }}>
                              {d.name}
                            </p>
                            <p>{"Price : " + d.price + "/-"}</p>
                          </div>
                          <div className="inc-dec">
                            <p
                              data-name={d.name}
                              onClick={(e) => {
                                if (count > 0) {
                                  decDish(e);
                                }
                              }}
                            >
                              -
                            </p>
                            <p
                              style={{
                                width: 40,
                                borderLeft: "none",
                                borderRight: "none",
                                cursor: "auto",
                              }}
                            >
                              {count}
                            </p>
                            <p
                              data-name={d.name}
                              data-img={d.img}
                              data-rate={d.price}
                              onClick={incDish}
                            >
                              +
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>LOADING...</div>
      )}
    </div>
  );
};

export default Rest;
