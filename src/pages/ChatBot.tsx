import { useEffect } from "react";
import UserMessageBox from "../components/UserMessageBox";
import AiMessageBox from "../components/AiMessageBox";
import { Send } from "lucide-react";

export default function ChatBot() {
  async function checking() {
    const translatorCapabilities = await self.ai.translator.capabilities();
    const res = translatorCapabilities.languagePairAvailable("es", "fr");
    console.log(res);
  }

  async function translate() {
    const translator = await window.ai.translator.create({
      sourceLanguage: "en",
      targetLanguage: "fr",
    });

    const translation = await translator.translate(
      "Where is the next bus stop, please?"
    );
    console.log(translation);
  }

  // Check if the Translator and Language Detector APIs are supported
  useEffect(() => {
    if (!("ai" in self) && !("translator" in self.ai)) {
      console.log("OYO is that you ?", self.ai.translator);
    }
    console.log(window);

    checking();
    translate();
  }, []);
  return (
    <>
      <UserMessageBox />
      <AiMessageBox />
      <UserMessageBox />
      <AiMessageBox />
      <UserMessageBox />
      <AiMessageBox />

      <div className="sticky bottom-2 flex space-x-2.5 w-full bg-[#020818] rounded-lg border border-[#222d3d] text-gray-200 focus-within:border-[#3498db]  pl-2 pr-4 py-3">
        <textarea
          name="message"
          id=""
          className="bg-transparent  w-full text-sm resize-none focus:outline-none border-none"
          rows={4}
          placeholder="Enter your Message...."
        ></textarea>
        <button className=" cursor-pointer  text-[#3498db] flex items-center justify-center rounded-lg">
          <Send size={25} />
        </button>
      </div>
    </>
  );
}
