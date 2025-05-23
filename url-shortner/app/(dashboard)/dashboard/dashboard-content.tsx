"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Link, Mouse, Activity, ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";

interface URL {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

interface Stats {
  totalUrls: number;
  totalClicks: number;
  mostClicked: number;
}

export default function DashboardContent() {
  const { user } = useUser();
  const [urls, setUrls] = useState<URL[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUrls: 0,
    totalClicks: 0,
    mostClicked: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = user?.emailAddresses?.[0]?.emailAddress;

        if (!userEmail) {
          console.error("No email found");
          return;
        }

        const response = await axios.get("/api/urls", {
          params: { email: userEmail },
        });

        if (response.data.success && response.data.data) {
          setUrls(response.data.data.urls || []);
          setStats(
            response.data.data.stats || {
              totalUrls: 0,
              totalClicks: 0,
              mostClicked: 0,
            }
          );
        }
      } catch (error) {
        console.error("Error fetching URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const statsItems = [
    {
      title: "URL's Generated",
      icon: <Link size={24} />,
      value: stats.totalUrls,
    },
    {
      title: "Total Clicks",
      icon: <Mouse size={24} />,
      value: stats.totalClicks,
    },
    {
      title: "Most Clicked",
      icon: <Activity size={24} />,
      value: stats.mostClicked,
    },
  ];

  if (loading) {
    return (
      <div className="p-4 md:p-8 xl:p-12 min-h-screen bg-black lg:ml-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 xl:p-12 min-h-screen bg-black lg:ml-64 transition-all duration-300">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-300 hover:text-green-500 transition-colors">
          Welcome Back{" "}
          <span className="block mt-2 sm:inline sm:mt-0 text-green-500 bg-green-500/10 px-3 py-1 rounded-lg text-lg sm:text-xl">
            {user?.firstName + " " + (user?.lastName ?? "")}
          </span>
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8">
          {statsItems.map((stat, index) => (
            <div
              key={index}
              className="group bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6 xl:p-8
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
                  className="text-base sm:text-lg xl:text-xl text-gray-300 font-semibold 
                           group-hover:text-green-500 transition-colors"
                >
                  {stat.title}
                </h2>
              </div>
              <p className="text-2xl sm:text-3xl xl:text-4xl font-mono text-green-500">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6 xl:p-8
                     hover:border-green-500 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
              <Activity size={24} className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl xl:text-2xl text-gray-300 font-semibold">
                Recent Activity
              </h2>
              <p className="text-sm sm:text-base text-gray-500">
                Your recently generated URLs
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {urls.map((url, index) => (
              <div
                key={index}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-black/40 
                           border border-gray-800 rounded-lg hover:border-green-500/50 
                           transition-all duration-300 gap-3 md:gap-6"
              >
                <div className="flex items-center gap-4 overflow-hidden w-full md:w-auto">
                  <div className="p-2 bg-green-500/5 rounded-md text-green-500 flex-shrink-0">
                    <Link size={20} />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <p className="text-gray-400 text-sm truncate md:max-w-[300px]">
                      {url.originalUrl}
                    </p>
                    <p className="text-green-500 font-mono text-sm mt-1 truncate">
                      {url.shortUrl}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                  <div className="text-left md:text-right flex-shrink-0">
                    <p className="text-gray-500 text-sm">Clicks</p>
                    <p className="text-green-500 font-mono text-base md:text-lg">
                      {url.clicks}
                    </p>
                  </div>
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-green-500 transition-colors flex-shrink-0"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))}

            {urls.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No URLs generated yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
