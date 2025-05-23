import Sidebar from "@/components/sidebar";
import React from "react";
import UserButtonWrapper from "./user-button-wrapper";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-black">
      <div className="flex justify-end p-7">
        <UserButtonWrapper />
      </div>
      {children}
      <Sidebar />
    </div>
  );
};

export default Dashboard;
