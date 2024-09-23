import { useContext, useEffect, useState } from "react";
import del from "../assets/close.svg";
import RtypeSdd from "../RtypeSdd";
import { AdminContext } from "../App";

const Addrtype = () => {
  const [arr, setArr] = useState([]);
  const [add, setAdd] = useState(true);
  const [item, setItem] = useState({});
  const [rname, setRname] = useState("");
  const { apiUrl, setUpd, setPop } = useContext(AdminContext);

  useEffect(() => {
    if (item?.name) {
      setArr(item.dishes);
    }
  }, [item]);

  useEffect(() => {
    if (add) {
      setArr([]);
    }
  }, [add]);

  const handleClick = () => {
    const dname = document.getElementById("rtypedish").value;
    const dimg = document.getElementById("rtypedishimg").value;
    if (dname.length === 0) {
      alert("Enter dish");
    } else {
      if (arr.includes(dname)) {
        alert("Already exist");
      } else {
        const copy = [...arr, { name: dname, img: dimg }];
        setArr(copy);
        document.getElementById("rtypedish").value = "";
        document.getElementById("rtypedishimg").value = "";
      }
    }
  };

  const deleteEle = (e) => {
    const i = e.target.dataset.ind;
    let copy = arr.filter((el) => el.name !== i);
    setArr(copy);
  };

  const addClick = async () => {
    const img = document.getElementById("rtypeimg").value;
    const res = await fetch(apiUrl + "rtype/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: rname, img: img, dishes: arr }),
    });

    const result = await res.json();
    if (result.status === "success") {
      let msg = result.rtype.name + " Added Successfully";
      setPop({ stat: true, msg });
      document.getElementById("rtypeimg").value = "";
    }
    setArr([]);
    setUpd(true);
  };

  const modClick = async () => {
    const img = document.getElementById("rtypeimg").value;
    const res = await fetch(apiUrl + "rtype/update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: rname,
        img: img,
        dishes: arr,
        rtypeid: item._id,
      }),
    });

    const result = await res.json();
    if (result.status === "success") {
      let msg = result.rtype.name + " Modified Successfully";
      setPop({ stat: true, msg });
      document.getElementById("rtypeimg").value = "";
    }
    setArr([]);
    setUpd(true);
    setAdd(true);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>FOOD TYPES</h1>
      <div style={{ display: "flex", alignItems: "center", margin: 20 }}>
        <label style={{ fontSize: "1.3rem" }} htmlFor="rtypedish">
          Type :
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <RtypeSdd setAdd={setAdd} setItem={setItem} setRname={setRname} />
          <input
            style={{ margin: "0 20px" }}
            type="text"
            name="rtimg"
            id="rtypeimg"
            placeholder="Image url"
          />
        </div>
        {add ? (
          <button onClick={addClick}>ADD</button>
        ) : (
          <button onClick={modClick}>MODIFY</button>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", margin: 20 }}>
        <label style={{ fontSize: "1.3rem" }} htmlFor="rtypedish">
          Dishes :
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <input
            style={{ margin: "0 20px" }}
            type="text"
            name="dish"
            id="rtypedish"
            placeholder="Dish Name"
          />
          <input
            style={{ margin: "0 20px" }}
            type="text"
            name="img"
            id="rtypedishimg"
            placeholder="Image url"
          />
        </div>
        <button onClick={handleClick}>ADD</button>
      </div>
      <div className="dishes">
        {arr.map((el, i) => {
          return (
            <div
              className="ele"
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px",
                alignItems: "center",
                height: 40,
                borderRadius: 20,
              }}
            >
              <p style={{}}>{el.name}</p>
              <img
                src={del}
                onClick={deleteEle}
                data-ind={el.name}
                alt="del"
                style={{ cursor: "pointer" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Addrtype;
