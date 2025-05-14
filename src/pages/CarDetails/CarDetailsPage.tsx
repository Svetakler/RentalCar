import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import styles from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const car = useSelector((state: RootState) =>
    state.cars.items.find((c) => c.id === id)
  );

  if (!car) return <p className={styles.notFound}>Car not found</p>;

  const [city, country] = car.address
    .split(",")
    .slice(1)
    .map((s) => s.trim());

  return (
    <div className={styles.pageContainer}>
      <div className={styles.detailsContainer}>
        <div className={styles.left}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={styles.carImg}
          />

          <div className={styles.bookingFormWrapper}>
            <h3 className={styles.formTitle}>Book your car now</h3>
            <h2 className={styles.paragraph}>
              Stay connected! We are always ready to help you.
            </h2>
            <form
              className={styles.bookingForm}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Request sent!");
              }}
            >
              <label>
                Name
                <input type="text" name="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Comment
                <textarea name="comment" rows={4} />
              </label>
              <button type="submit" className={styles.sendButton}>
                Send
              </button>
            </form>
          </div>
        </div>

        <div className={styles.right}>
          <h2 className={styles.title}>
            {car.brand} <span>{car.model}</span>, {car.year}
          </h2>

          <ul className={styles.infoList}>
            <li>{city}</li>
            <li>{country}</li>
            <li>{car.rentalCompany}</li>
            <li>Type: {car.type}</li>
            <li>Fuel Consumption: {car.fuelConsumption}</li>
            <li>Engine Size: {car.engineSize}</li>
            <li>Mileage: {car.mileage.toLocaleString()} km</li>
            <li>Price: {car.rentalPrice}</li>
          </ul>

          <p className={styles.description}>{car.description}</p>

          <div className={styles.features}>
            <div>
              <h4>Accessories</h4>
              <ul>
                {car.accessories.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Functionalities</h4>
              <ul>
                {car.functionalities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Rental Conditions</h4>
              <ul>
                {car.rentalConditions.map((cond, i) => (
                  <li key={i}>{cond}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
