import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import stringify from "json-stringify-pretty-compact";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function validJson(input: string) {
  try {
    const parsedJSON = JSON.parse(input);

    const formattedJSON = stringify(parsedJSON, { maxLength: 80 });

    return formattedJSON;
  } catch (e) {
    return false;
  }
}
