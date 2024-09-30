import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
const InputSlot = ({
  type,
  name,
  label,
  required,
  options,
  handleChange,
  checked,
}: {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  checked: boolean;
}) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "file":
      return (
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            onChange={handleChange}
            id={name}
            name={name}
            type={type}
            required={required || false}
          />
        </div>
      );

    case "textarea":
      return (
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            id={name}
            name={name}
            onChange={handleChange}
            required={required || false}
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

    case "checkbox":
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
  const formInputs: SchemaType = JSON.parse(schema);
  const [formData, setFormData] = useState<{ [key: string]: string | boolean }>(
    {}
  );

  for (const field of formInputs.fields) {
    if (field.type == "checkbox") {
      formData[field.name] = false;
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { name, value, type, checked, files } = e.target;

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

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className=" mx-auto border-2 p-5 my-10 border-blue-300"
    >
      {formInputs.fields.map((field) => (
        <InputSlot
          key={field.name}
          {...field}
          handleChange={handleChange}
          checked={(formData[field.name] as boolean) || false}
        />
      ))}
      <div className="flex items-center justify-between">
        <Button type="submit" className="w-full  mt-4">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
