import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

const Mapcomp = ({ loc, setDrploc, drploc }) => {
  let gloc = false;

  if (drploc) {
    gloc = true;
  }

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
        center={loc || [22.977632, 88.437273]}
        zoom={14}
        scrollWheelZoom={false}
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
