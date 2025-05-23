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
      <div className="lg:ml-64 p-4 md:p-8 h-full bg-black">Loading...</div>
    );
  }

  return (
    <div className="lg:ml-64 p-4 md:p-8 h-full bg-black animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-300 mb-6 md:mb-8 hover:text-green-500 transition-colors">
        Welcome Back{" "}
        <span className="text-green-500 bg-green-500/10 px-2 md:px-3 py-0.5 md:py-1 rounded-lg text-base md:text-lg">
          {user?.firstName + " " + (user?.lastName ?? "")}
        </span>
      </h1>

      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {statsItems.map((stat, index) => (
          <div
            key={index}
            className="group bg-gray-900/50 border border-gray-800 rounded-xl p-4 md:p-6 
                     hover:border-green-500 transition-all duration-300 ease-in-out 
                     hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div
                className="p-2 md:p-3 bg-green-500/10 rounded-lg text-green-500 
                          group-hover:bg-green-500 group-hover:text-black transition-colors"
              >
                {stat.icon}
              </div>
              <h2
                className="text-lg md:text-xl text-gray-300 font-semibold group-hover:text-green-500 
                         transition-colors"
              >
                {stat.title}
              </h2>
            </div>
            <p className="text-3xl md:text-4xl font-mono text-green-500">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div
        className="w-full bg-gray-900/50 border border-gray-800 rounded-xl mt-8 md:mt-12 p-4 md:p-6 
                    hover:border-green-500 transition-all duration-300 ease-in-out 
                    hover:shadow-lg hover:shadow-green-500/10"
      >
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="p-2 md:p-3 bg-green-500/10 rounded-lg text-green-500">
            <Activity size={20} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl text-gray-300 font-semibold">
              Recent Activity
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
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
  );
}
