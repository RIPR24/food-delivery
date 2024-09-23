import React, { useContext, useMemo, useState } from "react";
import { FDfrontContext } from "../App";
import search from "../assets/search.svg";
import { NavLink } from "react-router-dom";

const Srchbar = () => {
  const [arr, setArr] = useState([]);
  const { dataarr, setRestfilter } = useContext(FDfrontContext);
  const [inp, setInp] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setInp(val);
    if (val.length > 0) {
      let dat = dataarr.filter((el) =>
        el.name.toLowerCase().includes(val.toLowerCase())
      );
      setArr(dat);
    } else {
      setArr([]);
    }
  };

  const handleClick = (e) => {
    const key = e.target.dataset;
    setRestfilter(key);
    setArr([]);
    setInp("");
  };

  return (
    <div className="srchbar">
      <img src={search} alt="" />
      <input
        className="srchinp"
        value={inp}
        onChange={handleChange}
        type="text"
        name="srch"
        id="srchdrp"
        placeholder="Search"
        autoComplete="off"
      ></input>
      <div className="srchcon">
        {arr.map((el, i) => {
          return (
            <div key={i}>
              {el.type === "rest" ? (
                <NavLink
                  to={"/rest/:" + el.id}
                  onClick={() => {
                    setArr([]);
                    setInp("");
                  }}
                >
                  <p className="srchel">{el.name}</p>
                </NavLink>
              ) : (
                <p
                  onClick={handleClick}
                  className="srchel"
                  data-name={el.name}
                  data-type={el.type}
                >
                  {el.name}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Srchbar;
