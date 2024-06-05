import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrlParams } from "../hooks/useUrlParams";
import Message from "./Message";
import { useNavigate } from "react-router-dom";
import { postCity } from "../../CitySlice";
import { useDispatch} from "react-redux";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  let [cityName, setCityName] = useState("");
  let [date, setDate] = useState("");
  let [notes, setNotes] = useState("");
  let [error, setError] = useState("");
  let [country, setCountry] = useState("");
  let [emoji, setEmoji] = useState("");
  let [isFormLoading, setIsLoading] = useState(false);
  const [lat, lng] = useUrlParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("hello");
    if (!cityName && date==="") return;
    const newCity = {
      cityName,
      date,
      notes,
      country,
      emoji,
      position: {
        lat,
        lng,
      },
    };
    dispatch(postCity(newCity));
    navigate("/app/cities");
  }

  useEffect(
    function () {
      async function fetchCityData() {
        setError("");
        setIsLoading(true);
        try {
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data.city, data.countryName, data.countryCode);
          if (!data.countryCode && !data.countryName && !data.city)
            throw new Error("no city found click someWhere");
          setCityName(data.city);
          setCountry(data.countryName);
          setEmoji(data.countryCode);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  if (error) return <Message message={error} />;
  return (
    <form
      className={`${styles.form} `}
      onSubmit={(e) => handleSubmit(e)}
      style={isFormLoading ? { opacity: 0.5 } : {}}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}></span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to ?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button
          className="btn secondary-btn"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; back{" "}
        </button>
        <button className="btn primary-btn">add </button>
      </div>
    </form>
  );
}

export default Form;
