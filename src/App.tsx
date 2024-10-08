import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { validJson } from "./lib/utils";
import { ExampleDialog } from "./components/Modal";

function App() {
  const schema = {
    fields: [
      { type: "text", name: "name", label: "Name" },
      { type: "email", name: "email", label: "Email" },
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
      {
        type: "checkbox",
        name: "terms",
        label: "I agree to the terms and conditions",
      },
      { type: "file", name: "resume", label: "Resume" },
    ],
  };

  const [forms, setForms] = useState<string[]>([JSON.stringify(schema)]);
  // const handleSubmit = (formData: FormData) => {
  //   console.log("Form submitted:", formData);
  // };

  const [jsonInput, setJsonInput] = useState<string>("");
  return (
    <div className="container mx-auto my-10">
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
              if (!validJson(jsonInput)) {
                return alert("INVALID JSON");
              }

              setForms((prev) => [...prev, jsonInput]);
              setJsonInput("");
            }}
          >
            Submit
          </Button>
        </div>
        <div className="">
          <ExampleDialog></ExampleDialog>
        </div>
      </section>

      {/* <Form schema={JSON.stringify(schema)} /> */}
      <section className=" flex-1   ">
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
