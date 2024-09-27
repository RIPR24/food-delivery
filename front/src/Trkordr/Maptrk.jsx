import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import L from "leaflet";
import navic from "../assets/navigation.svg";
import home from "../assets/home.svg";

const navIcon = new L.Icon({
  iconUrl: navic,
  iconSize: [25, 25],
});

const homIcon = new L.Icon({
  iconUrl: home,
  iconSize: [25, 25],
});

const Maptrk = ({ home, pos }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{
        height: "80vh",
        width: "100%",
        maxWidth: 900,
        borderRadius: 20,
      }}
    >
      <MapContainer
        center={pos?.lat ? pos : home}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution=""
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pos.lat && <Marker position={pos} icon={navIcon}></Marker>}
        {home && <Marker position={home} icon={homIcon}></Marker>}
      </MapContainer>
    </motion.div>
  );
};

export default Maptrk;
