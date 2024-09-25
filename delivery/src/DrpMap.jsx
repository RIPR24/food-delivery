import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import L from "leaflet";
import navic from "./assets/navigation.svg";
import burg from "./assets/burger.svg";
import home from "./assets/home.svg";
import { DelContext } from "./App";

const navIcon = new L.Icon({
  iconUrl: navic,
  iconSize: [25, 25],
});

const homIcon = new L.Icon({
  iconUrl: home,
  iconSize: [25, 25],
});

const burgIcon = new L.Icon({
  iconUrl: burg,
  iconSize: [25, 25],
});

const DrpMap = ({ arr }) => {
  const { pos } = useContext(DelContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        height: "80vh",
        width: "100%",
      }}
    >
      <MapContainer
        center={pos.lat ? pos : [22.801546, 88.363295]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution=""
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pos.lat && <Marker position={pos} icon={navIcon}></Marker>}
        {arr.length > 0 &&
          arr.map((el) => {
            return (
              <Marker
                position={el.location.coor}
                key={el.name}
                icon={el.type === "rest" ? burgIcon : homIcon}
              >
                <Popup>{el.name}</Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </motion.div>
  );
};

export default DrpMap;
