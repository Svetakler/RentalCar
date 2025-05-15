import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, resetCars } from "../../redux/slices/carsSlice";
import type { RootState, AppDispatch } from "../../redux/store";
import CarCard from "../../components/CarCard/CarCard";
import FilterBar from "../../components/FilterBar/FilterBar";
import styles from "./CatalogPage.module.css";
import { getUniqueBrands } from "../../services/api";

import type { Filters } from "../../types/filters";

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, error, hasMore } = useSelector(
    (state: RootState) => state.cars
  );

  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>({
    brand: "",
    price: "",
    from: "",
    to: "",
  });
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandsData = await getUniqueBrands();
        setAvailableBrands(brandsData);
      } catch (error) {
        console.error("Failed to load brands:", error);
      }
    };

    loadBrands();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "auto";
    dispatch(resetCars());
    dispatch(fetchCars({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (page > 1) {
      if (isFiltering) {
        dispatch(fetchCars({ page, filters }));
      } else {
        dispatch(fetchCars({ page }));
      }
    }
  }, [dispatch, page, filters, isFiltering]);

  const handleFilterSubmit = (newFilters: {
    brand: string;
    price: string;
    from: string;
    to: string;
  }) => {
    setFilters(newFilters);
    setIsFiltering(true);

    dispatch(resetCars());
    setPage(1);

    dispatch(fetchCars({ page: 1, filters: newFilters }));
  };

  const loadMore = () => {
    if (!isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  const carsToShow = items;

  const canLoadMore = hasMore && !isLoading;

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
