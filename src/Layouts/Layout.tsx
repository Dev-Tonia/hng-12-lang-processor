import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import { v4 as uuidv4 } from "uuid";

export default function Layout() {
  // open the sidebar
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#020818] flex space-x-3  ">
      <SideBar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className=" hidden sm:block sm:w-[25%]  min-[920px]:w-[20%]"></div>

      <div className="   min-h-screen w-full  sm:w-[75%]  min-[920px]:w-[80%] ">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className=" wrapper pt-9 pb-5  relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
