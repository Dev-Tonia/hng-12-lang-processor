import { createContext } from "react";
import {
  GetMessage,
  Messages,
  SummaryOptions,
} from "../providers/DataProvider";
interface DataContextType {
  selectLang: string;
  setSelectLang: (lang: string) => void;
  message: string;
  setMessage: (message: string) => void;
  getMessages: GetMessage[];
  setGetMessages: (getMessages: GetMessage[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  detectedLang: string;
  setDetectedLang: (lang: string) => void;
  summaryOptions: SummaryOptions;
  setSummaryOptions: (options: SummaryOptions) => void;
  eachChatSession: Messages[];
  setEachChatSession: (eachChatSession: Messages[]) => void;
  uuid: string;
  setUuid: (uuid: string) => void;
  isSummarizing: boolean;
  setIsSummarizing: (isSummarizing: boolean) => void;
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
  eachChatSession: [],
  setEachChatSession: () => {
    console.warn("No provider found!");
  },
  uuid: "",
  setUuid: () => {
    console.warn("No provider found!");
  },
  isSummarizing: false,
  setIsSummarizing: () => {
    console.warn("No provider found!");
  },
};
const DataContext = createContext(defaultContextValue);

export default DataContext;
