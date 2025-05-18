import { useState, useEffect } from "react";

type Props = {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (cleanValue: string) => void;
  className?: string;
};

const FormattedNumberInput = ({
  id,
  placeholder = "",
  value,
  onChange,
  className = "",
}: Props) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value === "") {
      setDisplayValue("");
    } else {
      const num = parseInt(value.replace(/[^\d]/g, ""), 10);
      if (!isNaN(num)) {
        setDisplayValue(num.toLocaleString("en-US"));
      }
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    onChange(raw);
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      placeholder={placeholder}
      className={className}
      value={displayValue}
      onChange={handleChange}
    />
  );
};

export default FormattedNumberInput;
