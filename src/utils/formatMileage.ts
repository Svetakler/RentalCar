export const formatMileage = (mileage: number | string): string => {
  const num =
    typeof mileage === "string" ? parseInt(mileage.trim(), 10) : mileage;

  if (isNaN(num)) return "—";

  return num.toLocaleString("en-US") + " km";
};
