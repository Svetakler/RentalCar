import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import styles from "./CarDetailsPage.module.css";

import { HiOutlineMapPin } from "react-icons/hi2";
import { BsCheckCircle } from "react-icons/bs";
import { FaCarSide, FaDollarSign } from "react-icons/fa";
import { PiGasPumpBold, PiGaugeBold } from "react-icons/pi";
import { TbRoad } from "react-icons/tb";
import { LuCalendarClock } from "react-icons/lu";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const car = useSelector((state: RootState) =>
    state.cars.items.find((c) => c.id === id)
  );

  if (!car) {
    return <p className={styles.notFound}>Car not found</p>;
  }

  const addressParts = car.address.split(",").map((part) => part.trim());
  const city =
    addressParts.length > 1 ? addressParts[addressParts.length - 2] : "";
  const country =
    addressParts.length > 0 ? addressParts[addressParts.length - 1] : "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Request sent!");
  };

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
            <form className={styles.bookingForm} onSubmit={handleSubmit}>
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
                  name="bookingDate"
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

          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Rental Conditions:</h4>
            <ul className={styles.conditionList}>
              {car.rentalConditions.map((cond, i) => (
                <li key={i}>
                  <BsCheckCircle className={styles.icon} />
                  {cond}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
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
          </section>

          <section className={styles.section}>
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
          </section>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CarDetailsPage;
