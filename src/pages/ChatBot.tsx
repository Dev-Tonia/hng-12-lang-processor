import { useContext, useEffect } from "react";
import UserMessageBox from "../components/UserMessageBox";
import AiMessageBox from "../components/AiMessageBox";
import DataContext from "../context/DataContext";
import { Bounce, toast, ToastContainer } from "react-toastify";
import NotSupported from "../components/NotSupported";
import { v4 as uuidv4 } from "uuid";

import { saveChatSession } from "../utils/db"; // Import the save function from db.js
import CustomNotification from "../components/CustomNotification";
import MessageBox from "../components/MessageBox";
export default function ChatBot() {
  const { setUuid, uuid, eachChatSession } = useContext(DataContext);
  const isSupported = () => "ai" in self;

  // generate a unique id for  each chat session
  useEffect(() => {
    const newUUID = uuidv4();
    setUuid(newUUID);
  }, [setUuid]);

  // Save chat data to IndexedDB when the component unmounts
  useEffect(() => {
    return () => {
      if (uuid && eachChatSession.length > 0) {
        // Save the chat session to IndexedDB
        saveChatSession({
          id: uuid, // Use the UUID as the key
          title: `${eachChatSession[0].data.substring(0, 10)}...`, // Add a title for the session
          messages: eachChatSession, // Save all messages
        }).catch((error) => {
          toast.error(CustomNotification, {
            data: {
              title: "Oh Snap!",
              content: "Failed to save chat session: " + error.message,
            },
            ariaLabel: "Failed to save chat session" + error.message,
            theme: "colored",
            transition: Bounce,
            autoClose: 5000,
          });
        });
      }
    };
  }, [uuid, eachChatSession]);

  return (
    <div className="relative h-[90vh] flex flex-col">
      {!isSupported() ? (
        <NotSupported />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pb-32">
          {/* Add padding bottom to prevent content from going under MessageBox */}
          {eachChatSession &&
            eachChatSession.map((message, index) => {
              if (message.from === "user") {
                return <UserMessageBox key={index} message={message} />;
              } else {
                return <AiMessageBox key={index} message={message} />;
              }
            })}
        </div>
      )}
      <ToastContainer />
      <MessageBox />
    </div>
  );
}
