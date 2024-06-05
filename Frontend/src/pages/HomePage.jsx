import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import NavBar from "../components/NavBar";
import styles from "./HomePage.module.css";

const container = {
  hidden: { opacity: 0, translateY: -20 },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function HomePage() {
  return (
    <main className={styles.homepage}>
      <NavBar />
      <motion.section variants={container} initial="hidden" animate="visible">
        <motion.h1 variants={item}>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </motion.h1>
        <motion.h2 variants={item}>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </motion.h2>
        <motion.div variants={item} whileTap={{scale:1.1}}>
          <Link to="/login" className="primary-btn btn">
            Start tracking now &rarr;
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}

export default HomePage;
