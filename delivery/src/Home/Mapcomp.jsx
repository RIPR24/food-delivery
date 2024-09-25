import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import L from "leaflet";
import navic from "../assets/navigation.svg";
import burg from "../assets/burger.svg";
import home from "../assets/home.svg";
import { DelContext } from "../App";

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

const Mapcomp = ({ temp }) => {
  const { pos } = useContext(DelContext);
  const latm = (temp.cart.rest.location.coor.lat + temp.location.coor.lat) / 2;
  const lngm = (temp.cart.rest.location.coor.lng + temp.location.coor.lng) / 2;

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
        center={[latm, lngm] || [22.801546, 88.363295]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution=""
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pos.lat && <Marker position={pos} icon={navIcon}></Marker>}
        {temp._id && (
          <Marker
            position={temp.cart.rest.location.coor}
            icon={burgIcon}
          ></Marker>
        )}
        {temp._id && (
          <Marker position={temp.location.coor} icon={homIcon}></Marker>
        )}
      </MapContainer>
    </motion.div>
  );
};

export default Mapcomp;
