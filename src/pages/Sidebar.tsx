import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { MdLibraryAdd } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { useAuth } from "../contexts/AuthContextProvider";
import { auth } from "../components/firebase/firebaseConfig";

const TABS = [
  {
    path: "/dashboard",
    icon: <RiDashboardHorizontalFill />,
  },
  {
    path: "/dashboard/add-project",
    icon: <MdLibraryAdd />,
  },
  {
    path: "/dashboard/settings",
    icon: <IoMdSettings />,
  },
];

const Sidebar = () => {
  const [active, setActive] = useState<string>(TABS[0].path);
  const { settings } = useAuth();
  const username = settings ? settings.username : "Akif Ansari";

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("user logged out.....");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <div className="w-[500px] pt-12 border-r-2 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold text-purple-500">Welcome</h2>
      <h1 className="text-base mt-2 font-bold text-black/50">{username}</h1>
      <div className="flex flex-col gap-y-4 items-center mt-20 w-full px-6">
        {TABS.map((tab) => (
          <NavLink
            key={tab.path}
            onClick={() => setActive(tab.path)}
            to={tab.path}
            className={`flex items-center gap-x-4 py-3 justify-center cursor-pointer rounded-xl w-full font-bold text-base ${
              active === tab.path ? "bg-purple-500 text-white" : ""
            }`}
          >
            <span>{tab.icon}</span>
            <h2 className="capitalize">{tab.path.split("/").pop()}</h2>
          </NavLink>
        ))}
      </div>
      <button
        onClick={handleSignOut}
        className="border border-purple-500 text-purple-500 text-base absolute bottom-12 px-5 py-1 text-[14px] rounded-xl"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
