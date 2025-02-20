import { createContext } from "react";
import { GetMessage, SummaryOptions } from "../providers/DataProvider";
interface DataContextType {
  selectLang: string;
  setSelectLang: (lang: string) => void;
  message: string;
  setMessage: (message: string) => void;
  getMessages: GetMessage[];
  setGetMessages: (message: GetMessage[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  detectedLang: string;
  setDetectedLang: (lang: string) => void;
  summaryOptions: SummaryOptions;
  setSummaryOptions: (options: SummaryOptions) => void;
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
  getMessages: [],
  setGetMessages: () => {
    console.warn("No provider found!");
  },
  isLoading: false,
  setIsLoading: () => {
    console.warn("No provider found!");
  },
  detectedLang: "",
  setDetectedLang: () => {
    console.warn("No provider found!");
  },
  summaryOptions: {
    type: "key-points",
    format: "markdown",
    length: "medium",
  },
  setSummaryOptions: () => {
    console.warn("No provider found!");
  },
};
const DataContext = createContext(defaultContextValue);

export default DataContext;
