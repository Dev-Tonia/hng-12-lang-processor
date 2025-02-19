import { useState } from "react";
import DataContext from "../context/DataContext";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectLang, setSelectLang] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  return (
    <DataContext.Provider
      value={{
        selectLang,
        setSelectLang,
        message,
        setMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
