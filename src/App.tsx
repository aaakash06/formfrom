import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const schema = {
    fields: [
      { type: "text", name: "name", label: "Name" },
      { type: "email", name: "email", label: "Email", required: true },
      { type: "textarea", name: "message", label: "Message", required: false },
      {
        type: "select",
        name: "country",
        label: "Country",
        required: true,
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
        ],
      },
    ],
  };

  const [forms, setForms] = useState<string[]>([JSON.stringify(schema)]);
  // const handleSubmit = (formData: FormData) => {
  //   console.log("Form submitted:", formData);
  // };

  const [jsonInput, setJsonInput] = useState<string>("");
  return (
    <div className="flex bg-black/20  container  mx-auto my-10">
      <section className="flex flex-col gap-10 py-10 flex-1 ">
        <h1> Form Generator</h1>
        <div className="flex gap-6">
          <Input
            placeholder="Input Your Form JSON"
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
            }}
          ></Input>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setForms((prev) => [...prev, JSON.stringify(schema)]);
              setJsonInput("");
            }}
          >
            Submit
          </Button>
        </div>
      </section>

      {/* <Form schema={JSON.stringify(schema)} /> */}
      <section className=" flex-1   overflow-y-scroll h-[calc(100vh-4rem)]">
        <h1> Generated forms</h1>
        <>
          {forms.map((item, index) => (
            <div key={index}>
              <Form schema={item} />
            </div>
          ))}
        </>
      </section>
    </div>
  );
}

export default App;
