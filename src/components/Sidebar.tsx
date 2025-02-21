import { BookType } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllChatSessions } from "../utils/db"; // Import the function to retrieve all chat sessions

interface ChatSession {
  id: string;
  title: string;
  messages: Array<{
    data: string;
    from: string;
    lang: string;
    date: Date;
  }>;
}

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar }) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]); // State to store chat sessions

  // Retrieve all chat sessions when the component mounts
  useEffect(() => {
    const fetchChatSessions = async () => {
      const sessions = await getAllChatSessions();
      setChatSessions(sessions);
    };

    fetchChatSessions().catch((error) => {
      console.error("Failed to fetch chat sessions:", error);
    });
  }, []);

  return (
    <>
      <aside
        className={`
        fixed top-0 left-0 bottom-0 
        w-[50%] sm:w-[25%] min-[920]:w-[20%] 
        border-r-3 border-[#292929] 
        px-4 h-screen 
        bg-[#020818]
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:translate-x-0 sm:block
        z-40
      `}
      >
        <div
          className="flex overflow-y-auto h-full justify-between flex-col whitespace-nowrap border-b border-solid
         text-white border-b-[#292929] py-3"
        >
          <div className="flex items-center gap-2">
            <BookType className="text-[#3498db] size-8" />
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              textmosaic
            </h2>
          </div>

          {/* Display Chat Sessions as NavLinks */}
          <nav aria-label="Chat sessions">
            <div className="space-y-2">
              {chatSessions.map((session) => (
                <div
                  onClick={() => toggleSidebar()}
                  key={session.id} // Close the sidebar on click
                >
                  <NavLink
                    to={`/chat/${session.id}`}
                    className={({ isActive }) =>
                      `flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] ${
                        isActive
                          ? "bg-[#3498db] text-[#020818]"
                          : "bg-[#292929] text-[#FFFFFF] hover:bg-[#3498db] hover:text-[#020818]"
                      }`
                    }
                  >
                    <span className="truncate">{session.title}</span>
                  </NavLink>
                </div>
              ))}
            </div>
          </nav>

          {/* Share Button */}
          <div className="space-y-2">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#292929] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em]"
              aria-label="Share"
            >
              <span className="truncate">Share</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#020818]/10 backdrop-blur-xl z-30 sm:hidden"
          onClick={toggleSidebar}
          aria-hidden="true" // Hide the overlay from screen readers
        />
      )}
    </>
  );
};

export default SideBar;
