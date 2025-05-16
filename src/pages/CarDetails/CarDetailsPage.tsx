import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import styles from "./CarDetailsPage.module.css";

// Іконки
import { HiOutlineMapPin } from "react-icons/hi2";
import { BsCheckCircle } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { PiGasPumpBold, PiGaugeBold } from "react-icons/pi";
import { TbRoad } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";
// import { PiSteeringWheelBold } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa";

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
                <input type="text" name="name" required placeholder="Name*" />
              </label>
              <label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email*"
                />
              </label>

              <label>
                <input
                  type="text"
                  name="Booking date"
                  required
                  placeholder="Booking date"
                />
              </label>

              <label>
                <textarea
                  name="comment"
                  required
                  placeholder="Comment"
                  rows={4}
                />
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
            <span className={styles.carId}>Id: {car.id}</span>
          </h2>

          <ul className={styles.infoList}>
            <li>
              <HiOutlineMapPin className={styles.icon} />
              {city}, {country}
            </li>
            <li>
              <TbRoad className={styles.icon} />
              Mileage: {car.mileage.toLocaleString()} km
            </li>
            <li>
              <div className={styles.priceWrapper}>
                <FaDollarSign className={styles.dollarIcon} />
                {car.rentalPrice}
              </div>
            </li>
          </ul>

          <p className={styles.description}>{car.description}</p>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Rental Conditions:</h4>
            <ul className={styles.conditionList}>
              {car.rentalConditions.map((cond, i) => (
                <li key={i}>
                  <BsCheckCircle className={styles.icon} />
                  {cond}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Car Specifications:</h4>
            <ul className={styles.specsList}>
              <li>
                <LuCalendarClock className={styles.icon} />
                Year: {car.year}
              </li>
              <li>
                <FaCarSide className={styles.icon} />
                Type: {car.type}
              </li>
              <li>
                <PiGasPumpBold className={styles.icon} />
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li>
                <PiGaugeBold className={styles.icon} />
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>
              Accessories and functionalities:
            </h4>
            <ul className={styles.accessoriesList}>
              {[...car.accessories, ...car.functionalities].map((item, i) => (
                <li key={i}>
                  <BsCheckCircle className={styles.icon} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
