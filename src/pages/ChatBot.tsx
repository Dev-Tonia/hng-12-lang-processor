import { useContext } from "react";
import UserMessageBox from "../components/UserMessageBox";
import AiMessageBox from "../components/AiMessageBox";
import DataContext from "../context/DataContext";
import { ToastContainer } from "react-toastify";

export default function ChatBot() {
  const { getMessages } = useContext(DataContext);
  console.log(getMessages);
  return (
    <div className="">
      <div className="">
        {getMessages &&
          getMessages.map((data, index) => {
            if (data.from === "user") {
              return <UserMessageBox key={index} message={data} />;
            } else {
              return <AiMessageBox key={index} message={data} />;
            }
          })}
      </div>
      <ToastContainer />
    </div>
  );
}
