import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import logo from "../assets/icon.png"
function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img src={logo} alt="WorldWise logo"  className={styles.img}/>
      <h1>World Wise</h1>
    </Link>
  );
}

export default Logo;
