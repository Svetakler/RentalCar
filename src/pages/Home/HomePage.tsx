import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import carImage from "../../img/Picture.jpg";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${carImage})` }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button className={styles.button} onClick={() => navigate("/catalog")}>
          View Catalog
        </button>
      </div>
    </div>
  );
}

export default HomePage;
