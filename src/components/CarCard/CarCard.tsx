import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/slices/favoritesSlice";
import { type RootState } from "../../redux/store";
import { type Car } from "../../types/car";
import styles from "./CarCard.module.css";
import placeholder from "../../img/Picture.jpg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { formatMileage } from "../../utils/formatMileage";

interface Props {
  car: Car;
}

const CarCard = ({ car }: Props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((fav: Car) => fav.id === car.id);

  const navigate = useNavigate();

  const city = car.address.split(",")[1]?.trim() || "";
  const country = car.address.split(",")[2]?.trim() || "";
  const price = car.rentalPrice.replace("$", "");

  const formattedMileage = formatMileage(car.mileage);

  return (
    <div className={styles.carCard}>
      <div className={styles.imageContainer}>
        <img
          src={car.img && car.img !== "null" ? car.img : placeholder}
          alt={`${car.brand} ${car.model}`}
          className={styles.carImg}
        />
        <button
          className={styles.favoriteBtn}
          onClick={() => dispatch(toggleFavorite(car))}
        >
          {isFavorite ? (
            <AiFillHeart className={`${styles.heartIcon} ${styles.active}`} />
          ) : (
            <AiOutlineHeart className={styles.heartIcon} />
          )}
        </button>
      </div>

      <div className={styles.cardHeader}>
        <h3 className={styles.carTitle}>
          {car.brand} <span>{car.model}</span>, {car.year}
        </h3>
        <p className={styles.price}>${price}</p>
      </div>

      <div className={styles.carDetails}>
        <p>
          {city} | {country} | {car.type}
        </p>
        <p>
          {car.brand} | {formattedMileage} | {car.accessories[0]}
        </p>
      </div>

      <button
        className={styles.readMoreBtn}
        onClick={() => navigate(`/catalog/${car.id}`)}
      >
        Read more
      </button>
    </div>
  );
};

export default CarCard;
