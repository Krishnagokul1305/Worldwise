import NavBar from "../components/NavBar";
import styles from "./ProductPage.module.css";
import image from "../assets/img-2.jpg";
import { motion } from "framer-motion";
function PricingPage() {
  return (
    <main className={styles.product}>
      <NavBar />

      <section>
        <motion.div
          initial={{ translateX: -100, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
        >
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </p>
        </motion.div>
        <motion.img
          src={image}
          alt="overview of a large city with skyscrapers"
          className={styles.img}
          initial={{ translateX: 100, opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
        />
      </section>
    </main>
  );
}

export default PricingPage;
