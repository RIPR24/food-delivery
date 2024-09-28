import { useContext, useEffect, useState } from "react";
import { AdminContext } from "./App";

const RtypeSdd = ({ setItem, setAdd, setRname }) => {
  const [arr, setArr] = useState([]);
  const [rtype, setRtype] = useState("");
  const [poi, setPoi] = useState(0);

  const { items, upd } = useContext(AdminContext);

  useEffect(() => {
    setRtype("");
  }, [upd]);

  const keyDown = (e) => {
    switch (e.code) {
      case "ArrowDown":
        if (poi < arr.length - 1) {
          setPoi(poi + 1);
        }
        break;
      case "ArrowUp":
        if (poi > 0) {
          setPoi(poi - 1);
        }
        break;
      case "Enter":
        if (arr.length > 0) {
          setItem(arr[poi]);
          setRtype(arr[poi].name);
          document.getElementById("rtypeimg").value = arr[poi].img;
          setPoi(0);
          setArr([]);
          setAdd(false);
          if (setRname) {
            setRname(arr[poi].name);
          }
        }
      case "Tab":
        if (arr.length > 0) {
          setItem(arr[poi]);
          setRtype(arr[poi].name);
          document.getElementById("rtypeimg").value = arr[poi].img;
          setPoi(0);
          setArr([]);
          setAdd(false);
          if (setRname) {
            setRname(arr[poi].name);
          }
        }
    }
  };

  const handleChange = (e) => {
    setAdd(true);
    const val = e.target.value;
    setRtype(val);
    if (arr.length > 0) {
      if (arr[0].name.toLowerCase() === val.toLowerCase()) {
        setItem(arr[0]);
        document.getElementById("rtypeimg").value = arr[0].img;
        setPoi(0);
        setArr([]);
        setAdd(false);
      } else {
        setItem({});
      }
    }
    if (setRname) {
      setRname(val);
    }
    if (val.length > 0) {
      setArr(
        items.filter((el) => el.name.toLowerCase().includes(val.toLowerCase()))
      );
    } else {
      setArr([]);
    }
  };

  const handleClick = (e) => {
    const i = +e.target.dataset.ind;
    setItem(arr[i]);
    setRtype(arr[i].name);
    document.getElementById("rtypeimg").value = arr[i].img;
    if (setRname) {
      setRname(arr[poi].name);
    }
    setPoi(0);
    setArr([]);
    setAdd(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        name="name"
        id="rtypename"
        style={{ margin: "0 20px" }}
        value={rtype}
        onChange={handleChange}
        onKeyDown={keyDown}
        placeholder="Food Type"
        autoComplete="off"
      />
      <div
        style={{
          position: "absolute",
          top: 35,
          left: 30,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          width: 200,
        }}
      >
        {arr.map((el, i) => (
          <p
            key={i}
            data-ind={i}
            style={{ width: "100%", cursor: "pointer" }}
            onClick={handleClick}
            className={i === poi ? "srel act" : "srel"}
          >
            {el.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RtypeSdd;
