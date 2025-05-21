import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Dashboard = ({children} : any) => {
  return (
    <div className="h-screen bg-black">
      <div className="flex justify-end p-7">
        <UserButton />
      </div>
      {children}
      <Sidebar />
    </div>
  );
};

export default Dashboard;
