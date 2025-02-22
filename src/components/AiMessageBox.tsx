import { useContext } from "react";
import { Messages } from "../providers/DataProvider";
import DataContext from "../context/DataContext";
type UserMessageBoxProps = {
  message: Messages; // Use the GetMessage type
};
export default function AiMessageBox({ message }: UserMessageBoxProps) {
  const { isSummarizing } = useContext(DataContext);
  return (
    <div className=" mr-3 sm:mr-10 md:mr-25 ">
      {isSummarizing ? (
        <div className="flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          <p className="text-gray-500">Summarizing...</p>
        </div>
      ) : (
        <div className=" text-gray-100 text-base bg-[#10141E] p-6 rounded-lg mr-auto w-fit my-5 ">
          <div>{message.data}</div>
          <p className=" bg-[#35265F]/50 px-3 rounded-full inline-block my-3">
            language: <span className=" font-bold"> {message.lang} </span>
          </p>
        </div>
      )}
    </div>
  );
}
