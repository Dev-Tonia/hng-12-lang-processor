import { useContext } from "react";
import SideBar from "../components/Sidebar";
import DataContext from "../context/DataContext";
import { Send } from "lucide-react";
import { detectLanguage } from "../utils/AiCreations";
import { Bounce, toast } from "react-toastify";
import CustomNotification from "../components/CustomNotification";

export default function Layout({ children }: { children: React.ReactNode }) {
  // get the selected language from the context
  const {
    message,
    setMessage,
    setGetMessages,
    getMessages,
    setIsLoading,
    isLoading,
  } = useContext(DataContext);

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleLanguageDetection = async (text: string) => {
    if ("ai" in self && "languageDetector" in self.ai) {
      const result = await detectLanguage(text);
      if (result) {
        // setDetectedLang(result.detectedLanguage);
        return result.detectedLanguage;
      }
    } else {
      toast.error(CustomNotification, {
        data: {
          title: "Oh Snap!",
          content: "Language detection is not available",
        },
        ariaLabel: "Language detection is not available",
        progress: undefined,
        icon: false,
        theme: "colored",
        transition: Bounce,
        hideProgressBar: false,
        autoClose: 5000,
      });
      return;
    }
  };

  const handleSubmit = async () => {
    // Check if the message is not empty before sending
    if (message.trim() === "") {
      toast.error(CustomNotification, {
        data: {
          title: "Oh Snap!",
          content: "Please enter a message",
        },
        ariaLabel: "Please enter a message",
        progress: undefined,
        icon: false,
        theme: "colored",
        transition: Bounce,
        hideProgressBar: false,
        autoClose: 5000,
      });
      return;
    }
    let lang = "";
    if (message.trim() !== "") {
      setIsLoading(true);
      lang = await handleLanguageDetection(message);
      setIsLoading(false);
    }

    if (!isLoading) {
      setGetMessages([
        ...getMessages,
        { data: message, from: "user", lang: lang },
      ]);
      setMessage("");
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-[#020818] flex space-x-3 ">
      <SideBar />
      <div className=" relative  min-h-screen  w-full ">
        <header className="wrapper sticky top-0 left-0 right-0 bg-[#020818]  px-4 py-2 shadow-2xl backdrop-blur-2xl">
          <div className=" flex items-center justify-end"></div>
        </header>
        <main className=" wrapper py-9 min-h-[70vh] relative">
          {children}

          <div className="sticky bottom-0 right-0 left-0 w-full bg-[#020818] p-4">
            <div className="flex space-x-2.5 w-full bg-[#020818] rounded-lg border border-[#222d3d] text-gray-200 focus-within:border-[#3498db] pl-2 pr-4 py-3">
              <textarea
                onChange={handleMessage}
                onKeyDown={handleKeyDown}
                name="message"
                value={message} // Bind the value to the state
                className="bg-transparent w-full text-sm resize-none focus:outline-none border-none"
                rows={4}
                placeholder="Enter your Message...."
              ></textarea>
              <button className="cursor-pointer text-[#3498db] flex items-center justify-center rounded-lg">
                {isLoading}
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#3498db]"></div>
                    {/* <span className="ml-2 text-white">{isLoading}</span> */}
                  </div>
                ) : (
                  <Send size={25} onClick={handleSubmit} />
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
