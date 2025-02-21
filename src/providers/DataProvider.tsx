import { useState } from "react";
import DataContext from "../context/DataContext";
// import { createSummarizer } from "../utils/createSummarizer";
export interface GetMessage {
  data: string;
  from: string;
  lang: string;
}
export interface SummaryOptions {
  type: string;
  format: string;
  length: string;
}

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectLang, setSelectLang] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [getMessages, setGetMessages] = useState<GetMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detectedLang, setDetectedLang] = useState("");
  const [summaryOptions, setSummaryOptions] = useState<SummaryOptions>({
    type: "key-points",
    format: "markdown",
    length: "medium",
  });

  return (
    <DataContext.Provider
      value={{
        selectLang,
        setSelectLang,
        message,
        setMessage,
        getMessages,
        setGetMessages,
        isLoading,
        setIsLoading,
        detectedLang,
        setDetectedLang,
        summaryOptions,
        setSummaryOptions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
