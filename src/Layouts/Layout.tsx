import { useContext } from "react";
import SideBar from "../components/Sidebar";
import DataContext from "../context/DataContext";

export default function Layout({ children }: { children: React.ReactNode }) {
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

  // get the selected language from the context
  const { setSelectLang, selectLang } = useContext(DataContext);

  // function to handle language change
  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLang(e.target.value);
  };

  return (
    <div className="bg-[#020818] flex space-x-3 ">
      <SideBar />
      <div className=" relative  min-h-screen ">
        <header className="wrapper sticky top-0 left-0 right-0 bg-[#020818]  px-4 py-2 shadow-2xl backdrop-blur-2xl">
          <div className=" flex items-center justify-end">
            <p className=" text-white">{selectLang}</p>
            <select
              name="lang"
              id=""
              className=" text-gray-200 bg-[#020818] border border-[#3498db] focus:border-[#3498db] px-3 py-1.5 rounded-lg"
              onChange={handleLangChange}
            >
              <option value="">Select</option>
              {langs.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </header>
        <main className=" wrapper py-9">{children}</main>
      </div>
    </div>
  );
}
