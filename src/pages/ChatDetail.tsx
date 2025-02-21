import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserMessageBox from "../components/UserMessageBox";
import AiMessageBox from "../components/AiMessageBox";
import DataContext from "../context/DataContext";
import { ToastContainer } from "react-toastify";
import NotSupported from "../components/NotSupported";
import { getChatSession } from "../utils/db"; // Import the function to retrieve a chat session

export default function ChatDetail() {
  const { chatId } = useParams<{ chatId: string }>(); // Get the chat session ID from the URL
  const { eachChatSession, setEachChatSession } = useContext(DataContext); // Use context to manage chat session data
  const isSupported = () => "ai" in self;

  // Fetch chat session data when the component mounts or the ID changes
  useEffect(() => {
    const fetchChatSession = async () => {
      if (chatId) {
        console.log("Fetching chat session for chatId:", chatId); // Debugging: Log the chatId
        const session = await getChatSession(chatId); // Fetch the chat session from IndexedDB
        console.log("Retrieved session:", session); // Debugging: Log the retrieved session
        if (session) {
          setEachChatSession(session.messages); // Populate the chat session data
        } else {
          console.error("No session found for chatId:", chatId); // Debugging: Log if no session is found
        }
      }
    };

    fetchChatSession().catch((error) => {
      console.error("Failed to fetch chat session:", error);
    });
  }, [chatId, setEachChatSession]);

  return (
    <div className="">
      {!isSupported() ? (
        <NotSupported />
      ) : (
        <div className="">
          {eachChatSession && eachChatSession.length > 0 ? (
            eachChatSession.map((message, index) => {
              if (message.from === "user") {
                return <UserMessageBox key={index} message={message} />;
              } else {
                return <AiMessageBox key={index} message={message} />;
              }
            })
          ) : (
            <p className="text-white">No messages found for this session.</p> // Fallback if no messages are found
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
