import NavBar from "../components/NavBar";
import styles from "./ProductPage.module.css";
import image from "../assets/img-1.jpg";
import { motion } from "framer-motion";
function ProductPage() {
  return (
    <main className={styles.product}>
      <NavBar />

      <section>
        <motion.img
          src={image}
          alt="person with dog overlooking mountain with sunset"
          className={styles.img}
          initial={{ translateY: -100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
        />
        <motion.div
          initial={{ translateX: 50, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
        >
          <h2>About WorldWide.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </p>
        </motion.div>
      </section>
    </main>
  );
}

export default ProductPage;
