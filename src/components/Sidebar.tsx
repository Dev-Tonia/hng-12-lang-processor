import { BookType } from "lucide-react";
// import { useState } from "react";

const SideBar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
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
          className="flex  overflow-y-auto h-full justify-between flex-col whitespace-nowrap border-b border-solid
         text-white border-b-[#292929] py-3"
        >
          <div className="flex items-center gap-2">
            <BookType className="text-[#3498db] size-8" />
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              textmosaic
            </h2>
          </div>

          <div className="space-y-2">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#292929] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em]">
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
        />
      )}
    </>
  );
};

export default SideBar;
