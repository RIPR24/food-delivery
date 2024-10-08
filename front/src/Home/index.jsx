import { useContext, useRef } from "react";
import { FDfrontContext } from "../App";
import RestArr from "../RestArr";
import close from "../assets/close.svg";
import leftArrow from "../assets/left-arrow.svg";

const Home = () => {
  const { rtypes, setRestfilter, restfilter } = useContext(FDfrontContext);
  const ref = useRef();

  const handleClick = (e) => {
    const key = e.target.dataset.ind;
    setRestfilter({ name: key, type: "rtype" });
  };

  const scrollLeft = () => {
    ref.current.scrollLeft -= 150;
  };
  const scrollRight = () => {
    ref.current.scrollLeft += 150;
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
          <div
            style={{
              width: "90%",
              maxWidth: 1100,
              position: "relative",
            }}
          >
            <div className="scroll-btns">
              <img
                src={leftArrow}
                onClick={scrollLeft}
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  padding: 5,
                  cursor: "pointer",
                  translate: "-50% -100%",
                  backgroundColor: "white",
                  zIndex: 1,
                }}
              />
              <img
                src={leftArrow}
                onClick={scrollRight}
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  padding: 5,
                  cursor: "pointer",
                  translate: "50% -100%",
                  rotate: "180deg",
                  zIndex: 1,
                  backgroundColor: "white",
                }}
              />
            </div>
            <div ref={ref} style={{ display: "flex", overflowX: "hidden" }}>
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
                      loading="lazy"
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
