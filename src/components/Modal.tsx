import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { validJson } from "@/lib/utils";

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
export function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">JSON Example</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>JSON Example</DialogTitle>
        </DialogHeader>
        <div className="">
          <p>{validJson(JSON.stringify(schema))}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
