import React from "react";
// import { Input } from "./ui/input";

const CheckBox = ({
  name,
  label,
  required,
  handleChange,
  checked,
}: {
  type: string;
  name: string;
  label: string;
  required?: boolean;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) => {
  return (
    <div className="mb-4 flex justify-between items-center ">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        onChange={handleChange}
        title={name}
        type={"checkbox"}
        name={name}
        checked={checked}
        required={required || false}
      />
    </div>
  );
};

export default CheckBox;
