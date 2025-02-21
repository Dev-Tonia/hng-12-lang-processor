import { BookType, SquareChevronLeft } from "lucide-react";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <header className="wrapper sticky top-0 left-0 right-0 bg-[#020818] z-10 px-4 py-2 shadow-2xl backdrop-blur-2xl">
      <div className=" flex items-center justify-between">
        <SquareChevronLeft
          className=" text-white text-3xl sm:hidden"
          onClick={toggleSidebar}
        />
        <div className="flex items-center gap-2 sm:hidden ">
          <BookType className="text-[#3498db] size-8" />
          <h2 className=" text-lg font-bold leading-tight tracking-[-0.015em] text-white">
            textmosaic
          </h2>
        </div>
      </div>
    </header>
  );
}
