import { useState } from "react";
import DataContext from "../context/DataContext";
// import { createSummarizer } from "../utils/createSummarizer";

export interface SummaryOptions {
  type: string;
  format: string;
  length: string;
}

export interface Messages {
  data: string;
  from: string;
  lang: string;
  date: Date;
}
export interface GetMessage {
  id: string;
  title: string;
  messages: Messages[];
}

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectLang, setSelectLang] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detectedLang, setDetectedLang] = useState("");
  const [getMessages, setGetMessages] = useState<GetMessage[]>([]);
  const [eachChatSession, setEachChatSession] = useState<Messages[]>([]);
  const [summaryOptions, setSummaryOptions] = useState<SummaryOptions>({
    type: "key-points",
    format: "markdown",
    length: "medium",
  });
  const [uuid, setUuid] = useState<string>("");
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);

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
        eachChatSession,
        setEachChatSession,
        uuid,
        setUuid,
        isSummarizing,
        setIsSummarizing,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
