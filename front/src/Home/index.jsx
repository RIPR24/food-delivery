import React, { useContext } from "react";
import { FDfrontContext } from "../App";
import RestArr from "../RestArr";
import close from "../assets/close.svg";

const Home = () => {
  const { rtypes, setRestfilter, restfilter } = useContext(FDfrontContext);

  const handleClick = (e) => {
    const key = e.target.dataset.ind;
    setRestfilter({ name: key, type: "rtype" });
  };

  return (
    <div style={{ width: "100%", marginTop: 100 }}>
      {restfilter.name ? (
        <div
          style={{
            position: "relative",
            border: "1px solid #999999",
            borderRadius: 10,
            padding: "5px 15px",
            width: 300,
            marginLeft: 100,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: "1.2rem" }}>{restfilter.name}</p>
          <img
            src={close}
            onClick={() => {
              setRestfilter({});
            }}
            alt=""
            style={{ cursor: "pointer" }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#e9e9e9",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "1.6rem", margin: "5px 40px" }}>
            Whats On Your Mind
          </p>
          <div style={{ display: "flex", width: "90%", maxWidth: 1100 }}>
            {rtypes.map((el, i) => {
              return (
                <div
                  key={i}
                  data-ind={el.name}
                  onClick={handleClick}
                  className="rtypel"
                >
                  <img
                    src={el.img}
                    alt=""
                    data-ind={el.name}
                    style={{
                      height: 130,
                      width: 130,
                      borderRadius: "50%",
                      objectFit: "cover",
                      margin: "10px 0",
                    }}
                  />
                  <p data-ind={el.name}>{el.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <p style={{ fontSize: "1.5rem" }}>Food Delivery Resturants</p>
        <div style={{ width: "90%", maxWidth: 1100, marginTop: 20 }}>
          <RestArr />
        </div>
      </div>
    </div>
  );
};

export default Home;
