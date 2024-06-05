/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlParams } from "../hooks/useUrlParams";
import Message from "./Message";

function Map() {
  const { cities } = useSelector((store) => store.Cityreducer);
  const [mapPostion, setMapPosition] = useState([40, 0]);

  const { isLoading, position, error, getPosition } = useGeolocation();

  const [paramLat, paramLng] = useUrlParams();
  useEffect(
    function () {
      if (paramLat && paramLng) setMapPosition([paramLat, paramLng]);
    },
    [paramLat, paramLng]
  );
  useEffect(
    function () {
      if (position) setMapPosition([position.lat, position.lng]);
    },
    [position]
  );

  if (error) return <Message message={error} />;
  return (
    <div className={styles.mapContainer}>
      <motion.button className="btn primary-btn" onClick={getPosition} whileTap={{scale:1.1}}>
        {isLoading ? "loading..." : "current Location"}
      </motion.button>
      <MapContainer
        center={mapPostion}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <LocateCenter position={mapPostion} />
        <ClickEvent />
      </MapContainer>
    </div>
  );
}
function ClickEvent() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

function LocateCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
export default Map;
