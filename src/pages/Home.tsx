import { BookType } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Check local storage on component mount
  useEffect(() => {
    const isVisited = localStorage.getItem("isVisited");
    if (isVisited === "true") {
      // Redirect to /chat if isVisited is true
      navigate("/chat");
    }
  }, [navigate]);

  // handle get started button click
  const goToChat = () => {
    localStorage.setItem("isVisited", "true");
    navigate("/chat");
  };

  return (
    <div className="bg-[#020818] h-screen flex items-center justify-center text-gray-100 ">
      <div className="flex flex-col items-center justify-center w-[80%] sm:w-[50%] space-y-3 text-center">
        <div className=" flex items-center gap-2">
          <BookType className="text-[#3498db] size-9" />
          <h1>
            <span className="text-[#3498db]  text-4xl">TextMosaic</span>
          </h1>
        </div>
        <h3 className=" text-xl">
          <span className="text-[#3498db]">TextMosaic</span> Is An AI-Powered
          Text Processing
        </h3>
        <p>
          Detect languages, translate text, and summarize content instantly with
          our AI-driven tool.
        </p>
        <button
          onClick={goToChat}
          className="bg-[#3498db] cursor-pointer text-[#020818] border border-[#3498db] p-2 rounded my-5"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
