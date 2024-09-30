import React, { useState, ChangeEvent } from "react";

const Input = ({ type, name, label, required, options, onChange, checked }) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
    case "number":
      return (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            name={name}
            type={type}
            required={required}
            onChange={onChange}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            name={name}
            required={required}
            onChange={onChange}
          />
        </div>
      );
    case "select":
      return (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            name={name}
            required={required}
            onChange={onChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "file":
      return (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            name={name}
            type="file"
            required={required}
            onChange={onChange}
          />
        </div>
      );
    case "checkbox":
      return (
        <div className="mb-4">
          <label className="flex items-center text-gray-700 text-sm font-bold">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id={name}
              name={name}
              required={required}
              onChange={onChange}
              checked={checked}
            />
            <span>
              {label} {required && <span className="text-red-500">*</span>}
            </span>
          </label>
        </div>
      );
    default:
      return null;
  }
};

interface SchemaType {
  fields: {
    type: string;
    name: string;
    label: string;
    required?: boolean;
    options?: { label: string; value: string }[];
  }[];
}

const Form = ({ schema }: { schema: string }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target;
    console.log(e.target.value);
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const allFields: SchemaType = JSON.parse(schema);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      {allFields.fields.map((field) => (
        <Input
          key={field.name}
          {...field}
          onChange={handleChange}
          checked={formData[field.name]}
        />
      ))}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
