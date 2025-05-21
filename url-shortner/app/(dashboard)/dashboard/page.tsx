import { auth, currentUser } from "@clerk/nextjs/server";
import { Link, Mouse, Activity } from "lucide-react";
import React from "react";

const Page = async () => {
  const user = await currentUser();

  const stats = [
    { title: "URL's Generated", icon: <Link />, value: "20" },
    { title: "Total Clicks", icon: <Mouse />, value: "20" },
    { title: "Most Clicked", icon: <Activity />, value: "20" },
  ];

  return (
    <div className="ml-64 p-8 h-full bg-black animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-300 mb-8 hover:text-green-500 transition-colors">
        Welcome Back{" "}
        <span className="text-green-500 bg-green-500/10 px-3 py-1 rounded-lg">
          {user?.firstName + " " + (user?.lastName ?? "")}
        </span>
      </h1>

      <div className="mt-12 grid grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6 
                     hover:border-green-500 transition-all duration-300 ease-in-out 
                     hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-3 bg-green-500/10 rounded-lg text-green-500 
                          group-hover:bg-green-500 group-hover:text-black transition-colors"
              >
                {stat.icon}
              </div>
              <h2
                className="text-gray-300 font-semibold text-xl group-hover:text-green-500 
                         transition-colors"
              >
                {stat.title}
              </h2>
            </div>
            <p className="text-4xl font-mono text-green-500">{stat.value}</p>
          </div>
        ))}
      </div>

      <div
        className="w-full bg-gray-900/50 border border-gray-800 rounded-xl mt-12 p-6 
                    hover:border-green-500 transition-all duration-300 ease-in-out 
                    hover:shadow-lg hover:shadow-green-500/10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-gray-300 font-semibold text-xl">
              Recent Activity
            </h2>
            <p className="text-gray-500">Your recently generated URLs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
