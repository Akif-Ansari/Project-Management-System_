import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const Header = ({ className }: { className?: string }) => {
  const [role, setRoll] = useState<string>("employee");
  const [value, setValue] = useState<string>("");
  return (
    <header className={`w-full ${className}`}>
      {role === "employee" && (
        <div className="flex items-center gap-x-4">
          <FaUsers className="text-3xl" />
          <span className="text-xl">Employee</span>
        </div>
      )}
      <div className="flex my-8 items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="relative">
          <IoIosSearch
            className={`${
              value !== "" && "hidden"
            } text-xl text-black/50 absolute right-20 top-1/2 -translate-y-1/2
            
            `}
          />

          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            className="outline-none w-64 text-end border-b px-6 py-1"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
