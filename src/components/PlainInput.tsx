import React from "react";
import { Input } from "./ui/input";

const PlainInput = ({
  type,
  name,
  label,
  required,
  handleChange,
}: {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  // const [value, setValue] = useState<string>("");

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        onChange={handleChange}
        id={name}
        name={name}
        type={type}
        required={required || false}
      />
    </div>
  );
};

export default PlainInput;
