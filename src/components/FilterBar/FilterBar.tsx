import { useState } from "react";
import styles from "./FilterBar.module.css";
import FormattedNumberInput from "../FormattedNumberInput/FormattedNumberInput";

type Props = {
  onSubmit: (filters: {
    brand: string;
    price: string;
    from: string;
    to: string;
  }) => void;
  availableBrands: string[];
};

const FilterBar = ({ onSubmit, availableBrands }: Props) => {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSearch = () => {
    onSubmit({ brand, price, from, to });
  };

  const prices = Array.from({ length: 11 }, (_, i) => (i + 1) * 10);

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterItem}>
        <label htmlFor="brand">Car brand</label>
        <select
          id="brand"
          className={styles.selectField}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Choose a brand</option>
          {availableBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterItem}>
        <label htmlFor="price">Price/1 hour</label>
        <select
          id="price"
          className={styles.selectField}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">Choose a price</option>
          {prices.map((price) => (
            <option key={price} value={price}>
              ${price}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterItem}>
        <label htmlFor="from">Car mileage / km</label>
        <FormattedNumberInput
          id="from"
          placeholder="From"
          className={styles.inputField}
          value={from}
          onChange={setFrom}
        />
      </div>

      <div className={styles.filterItem}>
        <label htmlFor="to">To</label>
        <FormattedNumberInput
          id="to"
          placeholder="To"
          className={styles.inputField}
          value={to}
          onChange={setTo}
        />
      </div>

      <div className={styles.filterItem}>
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
