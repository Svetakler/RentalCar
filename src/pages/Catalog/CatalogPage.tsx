import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, resetCars } from "../../redux/slices/carsSlice";
import type { RootState, AppDispatch } from "../../redux/store";
import CarCard from "../../components/CarCard/CarCard";
import FilterBar from "../../components/FilterBar/FilterBar";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, error, hasMore } = useSelector(
    (state: RootState) => state.cars
  );

  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    brand: "",
    price: "",
    from: "",
    to: "",
  });
  const [filteredItems, setFilteredItems] = useState<typeof items>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
    dispatch(resetCars());
    dispatch(fetchCars(1));
  }, [dispatch]);

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchCars(page));
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (isFiltering) {
      const filtered = items.filter((car) => {
        const rentalPrice = Number(car.rentalPrice.replace("$", ""));
        const mileage = car.mileage;

        const matchesBrand = !filters.brand || car.brand === filters.brand;
        const matchesPrice = !filters.price || rentalPrice <= +filters.price;
        const matchesMileage =
          (!filters.from || mileage >= +filters.from) &&
          (!filters.to || mileage <= +filters.to);

        return matchesBrand && matchesPrice && matchesMileage;
      });

      setFilteredItems(filtered);
    }
  }, [items, filters, isFiltering]);

  const handleFilterSubmit = (newFilters: {
    brand: string;
    price: string;
    from: string;
    to: string;
  }) => {
    setFilters(newFilters);
    setIsFiltering(true);
  };

  const loadMore = () => {
    if (!isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  const carsToShow = isFiltering ? filteredItems : items;

  const canLoadMore = isFiltering ? false : hasMore && !isLoading;

  const availableBrands = [...new Set(items.map((car) => car.brand))];

  return (
    <div className={styles.catalog}>
      <FilterBar
        onSubmit={handleFilterSubmit}
        availableBrands={availableBrands}
      />

      {isLoading && page === 1 && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {!isLoading && carsToShow.length === 0 && (
        <p className={styles.empty}>No cars found.</p>
      )}

      <div className={styles.carsGrid}>
        {carsToShow.map((car) => (
          <div key={car.id} className={styles.cardFadeIn}>
            <CarCard car={car} />
          </div>
        ))}
      </div>

      {isLoading && page > 1 && (
        <p className={styles.loading}>Loading more cars...</p>
      )}

      {canLoadMore && (
        <div className={styles.loadMoreContainer}>
          <button onClick={loadMore} className={styles.loadMoreButton}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
