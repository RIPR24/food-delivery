import { useEffect, useState } from "react";
import RtypeSdd from "../RtypeSdd";
import del from "../assets/close.svg";

const Rtypelist = ({ menu, setMenu, item, setItem }) => {
  const [add, setAdd] = useState(true);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (item?.name) {
      if (item.olddishes) {
        setArr(item.olddishes);
      } else {
        let copy = [...item.dishes].map((el) => {
          return { ...el, price: 0, isveg: false };
        });
        setArr(copy);
      }
    }
  }, [item]);

  const handleChange = (e) => {
    const copy = [...arr];
    copy[e.target.dataset.ind].price = e.target.value;
    setArr(copy);
  };

  const handleClick = (e) => {
    const copy = [...arr];
    copy[e.target.dataset.ind].isveg = !copy[e.target.dataset.ind].isveg;
    setArr(copy);
  };

  const deleteEle = (e) => {
    const i = e.target.dataset.ind;
    let copy = arr.filter((el) => el.name !== i);
    setArr(copy);
  };

  return (
    <div className="rtypelist">
      <RtypeSdd setAdd={setAdd} setItem={setItem} />

      <div style={{ display: "flex", gap: 30, marginTop: 50 }}>
        <p style={{ fontSize: "1.5rem" }}>
          {"Name: " + (item?.name || "Select")}
        </p>
        {item?.name ? (
          <button
            onClick={() => {
              if (item?.name) {
                const copy = [...menu, { name: item.name, dishes: arr }];
                setMenu(copy);
                setItem({});
                setArr([]);
              }
            }}
          >
            Add
          </button>
        ) : (
          <button className="dect">Add</button>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          width: "100%",
        }}
      >
        {arr.map((el, i) => {
          return (
            <div key={i} className="rliel">
              <p>{el.name}</p>
              <input
                onChange={handleChange}
                value={el.price}
                data-ind={i}
                type="number"
                className="rliinp"
              />
              <p
                onClick={handleClick}
                data-ind={i}
                className={el.isveg ? "veg" : "nonveg"}
                style={{ cursor: "pointer" }}
              >
                {/*el.isveg ? "VEG" : "NON-VEG"*/}
              </p>
              <img
                src={del}
                onClick={deleteEle}
                data-ind={el.name}
                alt="del"
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: 5,
                  right: 5,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rtypelist;
