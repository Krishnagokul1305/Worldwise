import styles from "./CountryList.module.css";
import { useSelector } from "react-redux";
import CountryItem from "./CountryItem";

function CountryList() {
  const cities = useSelector((store) => store.Cityreducer.cities);
  console.log(cities);
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log(countries);
  if (!countries) return null;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
