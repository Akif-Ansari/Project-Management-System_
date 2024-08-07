import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="w-full flex justify-between gap-x-10 pr-12 min-h-screen">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Outlet />
      </section>
    </div>
  );
};

export default Dashboard;
