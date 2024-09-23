import { useContext, useEffect, useState } from "react";
import { FDfrontContext } from "../App";

const Orders = () => {
  const { socket, user, apiUrl } = useContext(FDfrontContext);
  const [orderarr, setOrderarr] = useState([]);

  const getStatus = (stat) => {
    if (stat === 0) {
      return { status: "Prepairing", col: "#d1d12a" };
    } else if (stat === 1) {
      return { status: "Ready for Pickup", col: "#d1d12a" };
    } else if (stat === 2) {
      return { status: "Out for Delivery", col: "#d1d12a" };
    } else if (stat === 3) {
      return { status: "Deliverd", col: "#1cbd22" };
    } else if (stat === 8) {
      return { status: "Cancelled", col: "#b3211e" };
    } else if (stat === 9) {
      return { status: "Cancelled by the resturant", col: "#b3211e" };
    } else {
      return { status: "Unknown", col: "#bfbfbf" };
    }
  };

  useEffect(() => {
    socket.emit("get-user-orders", { uid: user._id, usid: socket.id });
    socket.on("user-orders-res", (arr) => {
      console.log(arr);

      setOrderarr(arr);
    });
  }, []);

  return (
    <div
      style={{
        marginTop: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
      }}
    >
      <p className="headers">ORDERS</p>
      {orderarr.map((el, i) => {
        const dat = new Date(el.timeStamp[0]);
        const date = dat.toDateString();
        const time = dat.toLocaleTimeString();
        const status = getStatus(el.status);

        return (
          <div key={i} className="order-con">
            <div style={{ position: "relative", display: "flex", gap: 10 }}>
              <img
                src={`${apiUrl}${el.cart.rest.img}`}
                alt=""
                style={{
                  height: 70,
                  width: 70,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
              <div>
                <p style={{ fontSize: "1.2rem" }}>{el.cart.rest.name}</p>
                <p style={{ color: "#666666" }}>{el.cart.rest.location.name}</p>
              </div>
            </div>
            <div style={{ margin: 20, fontWeight: 500 }}>
              {el.cart.dishes.map((d) => {
                return <p key={d.name}>{d.qnt + " x " + d.name}</p>;
              })}
            </div>
            <div>
              <p style={{ color: "#666666" }}>
                {"Order placed at " + date + ", " + time}
              </p>
              <p style={{ color: status.col }}>{status.status}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: 20,
              }}
            >
              {el.status === 2 && <p className="trk">Track Order</p>}
              {el.status < 3 && <p className="cncl">Cancel Order</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
