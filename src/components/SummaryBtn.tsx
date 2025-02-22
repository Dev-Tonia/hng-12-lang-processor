import { useContext } from "react";
// import { createSummarizer } from "../utils/AiCreations";
import DataContext from "../context/DataContext";
import { Messages, SummaryOptions } from "../providers/DataProvider";
import { FileScan } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import CustomNotification from "./CustomNotification";

export default function SummaryBtn({ message }: { message: Messages }) {
  // vaules from context
  const {
    setEachChatSession,
    eachChatSession,
    selectLang,
    summaryOptions,
    setSummaryOptions,
    setIsSummarizing,
  } = useContext(DataContext);

  // handle summary option change
  const handleOptionChange = (option: keyof SummaryOptions, value: string) => {
    setSummaryOptions({
      ...summaryOptions,
      [option]: value,
    });
  };

  // summarize the message
  const handleSummarize = async () => {
    try {
      setIsSummarizing(true);

      const options = {
        sharedContext: "This is a context",
        type: summaryOptions.type,
        format: summaryOptions.format,
        length: summaryOptions.length,
      };

      const available = (await self.ai.summarizer.capabilities()).available;
      let summarizer;

      if (available === "no") {
        throw new Error("Summarizer API is not available");
      }

      if (available === "readily") {
        summarizer = await self.ai.summarizer.create(options);
      } else {
        summarizer = await self.ai.summarizer.create(options);
        summarizer.addEventListener("downloadprogress", (e) => {
          console.log(e.loaded, e.total);
        });
        await summarizer.ready;
      }

      const summary = await summarizer.summarize(message.data);

      setEachChatSession([
        ...eachChatSession,
        { data: summary, from: "bot", lang: selectLang, date: new Date() },
      ]);

      // Scroll to bottom after message is sent
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    } catch (error) {
      toast.error(CustomNotification, {
        data: {
          title: "Error",
          content:
            error instanceof Error ? error.message : "Failed to summarize text",
        },
        theme: "colored",
        transition: Bounce,
        hideProgressBar: false,
        autoClose: 5000,
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="flex justify-between items-end auto-cols-min mb-5">
      <div className="grid grid-cols-2 min-[500px]:grid-cols-4  items-end gap-4 min-[840px]:gap-2">
        <div className="text-gray-100 w-fit">
          <select
            value={summaryOptions.type}
            onChange={(e) => handleOptionChange("type", e.target.value)}
            className="text-gray-200 bg-[#222d3d] border text-xs border-[#3498db] focus:border-[#3498db] px-2 py-1 rounded-lg"
          >
            <option value="key-points">Key Points</option>
            <option value="tl;dr">TL;DR</option>
            <option value="teaser">Teaser</option>
            <option value="headline">Headline</option>
          </select>
        </div>
        <div className="text-gray-100 w-full">
          <select
            value={summaryOptions.length}
            onChange={(e) => handleOptionChange("length", e.target.value)}
            className="text-gray-200 bg-[#222d3d] w-full border text-xs border-[#3498db] focus:border-[#3498db] px-2 py-1 rounded-lg"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="text-gray-100 w-fit">
          <select
            value={summaryOptions.format}
            onChange={(e) => handleOptionChange("format", e.target.value)}
            className="text-gray-200 bg-[#222d3d] border text-xs border-[#3498db] focus:border-[#3498db] px-2 py-1 rounded-lg"
          >
            <option value="markdown">Markdown</option>
            <option value="plain-text">Plain text</option>
          </select>
        </div>
        <button
          onClick={handleSummarize}
          className="text-gray-200 bg-[#3498db]  w-fit cursor-pointer border border-[#3498db] focus:border-[#3498db] px-3 py-1.5 rounded-lg"
          aria-label="Summarize"
        >
          <FileScan />
        </button>
      </div>
    </div>
  );
}
