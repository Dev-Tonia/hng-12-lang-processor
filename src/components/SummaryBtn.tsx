import { useContext } from "react";
import { createSummarizer } from "../utils/AiCreations";
import DataContext from "../context/DataContext";
import { GetMessage, SummaryOptions } from "../providers/DataProvider";
import { FileScan } from "lucide-react";

// Fix the type error by updating SummarizerOptions
// interface SummarizerOptions {
//     type: 'key-points';  // Only allow 'key-points' as specified in the error
//     format: 'markdown' | 'plain' | 'html';
//     length: 'short' | 'medium' | 'long';
//     sharedContext: string;
//   }
export default function SummaryBtn({ message }: { message: GetMessage }) {
  const {
    setGetMessages,
    getMessages,
    selectLang,
    summaryOptions,
    setSummaryOptions,
  } = useContext(DataContext);

  const handleOptionChange = (option: keyof SummaryOptions, value: string) => {
    setSummaryOptions({
      ...summaryOptions,
      [option]: value,
    });
  };
  const handleSummarize = async () => {
    const options = {
      sharedContext: message,
      ...summaryOptions,
    };
    let summary;
    if ("ai" in self && "summarizer" in self.ai) {
      summary = await createSummarizer(options);
    }

    if (summary) {
      setGetMessages([
        ...getMessages,
        { data: summary, from: "bot", lang: selectLang },
      ]);
    }
  };
  return (
    <div className=" flex justify-between items-end mb-5">
      <div className=" flex  items-end space-x-5">
        <div className="   text-gray-100">
          <select
            value={summaryOptions.type}
            onChange={(e) => handleOptionChange("type", e.target.value)}
            name="type"
            id=""
            className=" text-gray-200 bg-[#222d3d] border text-xs border-[#3498db] focus:border-[#3498db] px-2 py-1  rounded-lg"
          >
            <option value="key-points">Key Points</option>
            <option value="tl;dr">TL;DR</option>
            <option value="teaser">Teaser</option>
            <option value="headline">Headline</option>
          </select>
        </div>
        <div className="   text-gray-100">
          <select
            value={summaryOptions.length}
            onChange={(e) => handleOptionChange("length", e.target.value)}
            name="length"
            id=""
            className=" text-gray-200 bg-[#222d3d] border text-xs border-[#3498db] focus:border-[#3498db] px-2 py-1  rounded-lg"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="   text-gray-100">
          <select
            value={summaryOptions.format}
            onChange={(e) => handleOptionChange("format", e.target.value)}
            name="format"
            id=""
            className=" text-gray-200 bg-[#222d3d] border text-xs border-[#3498db] focus:border-[#3498db] px-2 py-1  rounded-lg"
          >
            <option value="markdown">Markdown</option>
            <option value="plain-text">Plain text</option>
          </select>
        </div>
        <button
          onClick={handleSummarize}
          className=" text-gray-200 bg-[#3498db] cursor-pointer border border-[#3498db] focus:border-[#3498db] px-3 py-1.5 rounded-lg"
          aria-label="Summarize"
        >
          <FileScan />
        </button>
      </div>
    </div>
  );
}
