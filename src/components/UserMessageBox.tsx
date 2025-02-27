import { useContext } from "react";
import DataContext from "../context/DataContext";
import { createTranslator } from "../utils/AiCreations";
import { Bounce, toast } from "react-toastify";
import CustomNotification from "./CustomNotification";
import SummaryBtn from "./SummaryBtn";
import { Globe } from "lucide-react";
import { Messages } from "../providers/DataProvider";
// import { FileScan, Globe } from "lucide-react";
// import { SummaryOptions } from "../providers/DataProvider";

type UserMessageBoxProps = {
  message: Messages; // Use the GetMessage type
};

export default function MessageBox({ message }: UserMessageBoxProps) {
  // data for lang options
  const langs: { name: string; code: string }[] = [
    {
      name: "English",
      code: "en",
    },
    {
      name: "Spanish",
      code: "es",
    },
    {
      name: "French",
      code: "fr",
    },
    {
      name: "Portuguese",
      code: "pt",
    },
    {
      name: "Russian",
      code: "ru",
    },
    {
      name: "Turkish",
      code: "tr",
    },
  ];

  const { setSelectLang, eachChatSession, setEachChatSession, selectLang } =
    useContext(DataContext);

  // function to handle language change
  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLang(e.target.value);
  };

  // function to handle summary  options

  // function to translate the message
  const handleMessageTranslation = async () => {
    if (selectLang.trim() === "") {
      toast.error(CustomNotification, {
        data: {
          title: "Oh Snap!",
          content: "Please select a language",
        },
        ariaLabel: "Please select a language",
        progress: undefined,
        icon: false,
        theme: "colored",
        transition: Bounce,
        hideProgressBar: false,
        autoClose: 5000,
      });
      return;
    }
    const translatedText = await createTranslator(
      message.lang,
      selectLang,
      message.data
    );
    if (translatedText) {
      setEachChatSession([
        ...eachChatSession,
        {
          data: translatedText,
          from: "bot",
          lang: selectLang,
          date: new Date(),
        },
      ]);
    }
  };
  // check if the message is greater than  150 characters
  const isLongMessage = message.data.length > 150;
  return (
    <div className=" ml-3 sm:ml-10 md:ml-25 ">
      <div className=" text-gray-100 text-base bg-[#222d3d] p-6 rounded-lg ml-auto w-fit  my-5 ">
        {/* summary options */}
        {isLongMessage && <SummaryBtn message={message} />}
        {/* message */}
        <div>{message.data}</div>
        <p className=" bg-[#35265F]/50 px-3 rounded-full inline-block my-3">
          language: <span className=" font-bold"> {message.lang} </span>
        </p>
        {/* language options */}
        <div className="  flex justify-end mt-5">
          <div className=" flex flex-col  min-[290px]:flex-row items-end gap-5">
            <div className=" flex flex-col  text-gray-100 -full min-[290px]:w-fit">
              <select
                name="lang"
                id=""
                className=" text-gray-200 bg-[#020818] w-full min-[290px]:w-fit border border-[#3498db] focus:border-[#3498db] px-3 py-1.5 rounded-lg"
                onChange={handleLangChange}
              >
                <option value="">Select Lang</option>
                {langs.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleMessageTranslation}
              className=" text-gray-200 bg-[#3498db] cursor-pointer border border-[#3498db] focus:border-[#3498db] px-3 py-1.5 rounded-lg"
              aria-label="Translate"
            >
              <Globe />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
