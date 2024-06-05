import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "./Logo";
function NavBar() {
  return (
    <nav className={styles.NavBar}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">
            <div>Home</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/product">
            <div>Product</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/pricing">
            <div>Pricing</div>
          </NavLink>
        </li>
      </ul>
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
    </nav>
  );
}

export default NavBar;
