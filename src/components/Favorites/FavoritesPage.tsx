import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import CarCard from "../../components/CarCard/CarCard";
import styles from "../Catalog/CatalogPage.module.css";

const FavoritesPage = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className={styles.catalogPage}>
      <h2>Favorites</h2>

      {favorites.length === 0 ? (
        <div className={styles.emptyMessage}>
          You don't have any favorite cars yet.
        </div>
      ) : (
        <div className={styles.carGrid}>
          {favorites.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
