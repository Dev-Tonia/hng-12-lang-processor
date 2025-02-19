import { createContext } from "react";
interface DataContextType {
  selectLang: string;
  setSelectLang: (lang: string) => void;
  message: string;
  setMessage: (message: string) => void;
}

// Define a default value
const defaultContextValue: DataContextType = {
  selectLang: "en", // Default language
  setSelectLang: () => {
    console.warn("No provider found!");
  },
  message: "",
  setMessage: () => {
    console.warn("No provider found!");
  },
};
const DataContext = createContext(defaultContextValue);

export default DataContext;
