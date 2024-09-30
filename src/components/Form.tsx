import { Button } from "./ui/button";

import { useState } from "react";
import PlainInput from "./PlainInput";
import SelectInput from "./SelecInput";
import CheckBox from "./CheckBox";

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
  const [formData, setFormData] = useState<{
    [key: string]: string | boolean | File | null;
  }>({});
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };
  const handleSelectAndPlain = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : null,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <form className=" mx-auto border-2 p-5 my-10 border-blue-300">
      {formInputs.fields.map((field) => {
        switch (field.type) {
          case "text":
          case "email":
          case "password":
          case "number":
            return (
              <PlainInput
                key={field.name}
                {...field}
                handleChange={handleSelectAndPlain}
              />
            );
          case "file":
            return (
              <PlainInput
                key={field.name}
                {...field}
                handleChange={handleFile}
              />
            );

          case "textarea":
            return (
              <PlainInput
                key={field.name}
                {...field}
                handleChange={handleSelectAndPlain}
              />
            );
          case "select":
            return (
              <SelectInput
                key={field.name}
                {...field}
                handleChange={handleSelectAndPlain}
              />
            );

          case "checkbox":
            return (
              <CheckBox
                key={field.name}
                {...field}
                checked={(formData[field.name] as boolean) || false}
                handleChange={handleCheckBox}
              />
            );

          default:
            return null;
        }
      })}
      <div className="flex items-center justify-between">
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full  mt-4"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
