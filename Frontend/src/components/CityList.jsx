// import Spinner from "./Spinner";
import { memo, useEffect } from "react";
import styles from "./CityList.module.css";
import { getAllCities } from "../../CitySlice";
import { useDispatch, useSelector } from "react-redux";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { motion } from "framer-motion";



const CityList = memo(function CityList() {
  const { cities, isLoading, error } = useSelector(
    (store) => store.Cityreducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);
  if (isLoading) return <Spinner />;
  if (error) return <Message message={error} />;
  if (cities.length === 0) return <Message message={"start to add cities"} />;
  return (
    <motion.ul
      className={styles.cityList}
    >
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </motion.ul>
  );
});

export default CityList;
