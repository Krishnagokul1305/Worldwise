import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./User.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../userSlice";
import Message from "./Message";
function User() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { user } = useSelector((store) => store.userReducer);
  function handleClick(){
    dispatch(logout())
    navigate("/")
  }
  return (
    <motion.div className={styles.user} whileHover={{scale:1.1}}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </motion.div>
  );
}

export default User;

/*
CHALLENGE
1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
