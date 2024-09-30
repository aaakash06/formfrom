import React from "react";

// import { Input } from "./ui/input";

const SelectInput = ({
  name,
  label,
  required,
  options,
  handleChange,
}: {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        required={required}
        onChange={handleChange}
      >
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
