import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Mapcomp = ({ setDrploc, drploc }) => {
  let gloc = true;

  if (drploc) {
    gloc = true;
  }

  useEffect(() => {
    console.log(drploc);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const cor = { lat: latitude, lng: longitude };
          if (drploc?.lat) {
          } else {
            setDrploc(cor);
          }
        },
        (err) => {},
        {
          enableHighAccuracy: true,
        }
      );
    }
  }, []);

  function GetLoc() {
    const map = useMapEvents({
      click(e) {
        setDrploc(e.latlng);
      },
    });

    if (drploc?.lat) {
      return <Marker position={drploc}></Marker>;
    }
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: 20,
      }}
    >
      <MapContainer
        center={drploc || [22.5743545, 88.3628734]}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution=""
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {gloc && <GetLoc />}
      </MapContainer>
    </motion.div>
  );
};

export default Mapcomp;
