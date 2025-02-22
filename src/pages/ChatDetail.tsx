import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserMessageBox from "../components/UserMessageBox";
import AiMessageBox from "../components/AiMessageBox";
import DataContext from "../context/DataContext";
import { Bounce, toast, ToastContainer } from "react-toastify";
import NotSupported from "../components/NotSupported";
import { getChatSession } from "../utils/db";
import CustomNotification from "../components/CustomNotification";
import MessageBox from "../components/MessageBox";

export default function ChatDetail() {
  const { chatId } = useParams<{ chatId: string }>();
  const { eachChatSession, setEachChatSession, setGetMessages, getMessages } =
    useContext(DataContext);
  const isSupported = () => "ai" in self;

  // Fetch chat session data when the component mounts or the ID changes
  useEffect(() => {
    const fetchChatSession = async () => {
      if (chatId) {
        const session = await getChatSession(chatId);
        console.log("Retrieved session:", session);
        if (session) {
          setEachChatSession(session.messages);
          setGetMessages([...getMessages, ...session]);
        } else {
          toast.error(CustomNotification, {
            data: {
              title: "Oh Snap!",
              content: "No session found for chatId:" + chatId,
            },
            ariaLabel: "No session found for chatId:" + chatId,
            progress: undefined,
            icon: false,
            theme: "colored",
            transition: Bounce,
            hideProgressBar: false,
            autoClose: 5000,
          });
        }
      }
    };

    fetchChatSession().catch((error) => {
      toast.error(CustomNotification, {
        data: {
          title: "Oh Snap!",
          content: "Failed to fetch chat session:" + error.message,
        },
        ariaLabel: "Failed to fetch chat session:" + error.message,
        progress: undefined,
        icon: false,
        theme: "colored",
        transition: Bounce,
        hideProgressBar: false,
        autoClose: 5000,
      });
    });
  }, [chatId, setEachChatSession, getMessages, setGetMessages]);

  return (
    <div className="relative min-h-[90vh] flex flex-col">
      {!isSupported() ? (
        <NotSupported />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pb-32">
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
      <MessageBox />
    </div>
  );
}
