import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const InputSlot = ({
  type,
  name,
  label,
  required,
  options,
}: {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}) => {
  switch (type) {
    case "text":
    case "email":
    case "password":
    case "number":
      return (
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Input
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
          <Textarea id={name} name={name} required={required || false} />
        </div>
      );
    case "select":
      return (
        <div className="mb-4">
          <Label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={name}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </Label>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={name} />
            </SelectTrigger>

            <SelectContent defaultValue={options![0].value}>
              {options?.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.value}
                </SelectItem>
              ))}
              <SelectItem value="apple">Apple</SelectItem>
            </SelectContent>
          </Select>
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
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      onChange={(e) => {
        handleChange(e);
      }}
      className="w- mx-auto border-2 p-5 my-10 border-blue-300"
    >
      {formInputs.fields.map((field) => (
        <InputSlot key={field.name} {...field} />
      ))}
      <div className="flex items-center justify-between">
        <Button className="w-full  mt-4">Submit</Button>
      </div>
    </form>
  );
};

export default Form;
