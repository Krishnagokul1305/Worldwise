import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import styles from "./LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../userSlice";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const { error, islogged } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ email, password }));
  }
  useEffect(
    function () {
      if (islogged) navigate("/app", { replace: true });
    },
    [islogged, navigate]
  );
  return (
    <main className={styles.login}>
      <NavBar />
      <motion.form
        className={styles.form}
        onSubmit={(e) => handleSubmit(e)}
        initial={{ translateY: -100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
      >
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {error && <Message message={error} />}
        <div>
          <button className="btn secondary-btn">Login</button>
        </div>
      </motion.form>
    </main>
  );
}

export default LoginPage;
