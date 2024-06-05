/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom";
// import { useCities } from "../contexts/CitiesContext";
import { useDispatch } from "react-redux";
import styles from "./CityItem.module.css";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { deleteCity } from "../../CitySlice";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, position, id } = city;
  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(deleteCity(id));
  }

  return (
    <motion.li whileHover={{ scale: 1.1 }}>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({date ? formatDate(date) : ""})</time>
        <button className={styles.deleteBtn} onClick={(e) => handleClick(e)}>
          &times;
        </button>
      </Link>
    </motion.li>
  );
}

export default CityItem;
