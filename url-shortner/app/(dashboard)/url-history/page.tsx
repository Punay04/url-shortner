"use client";

import { useUser } from "@clerk/nextjs";
import { Link, ExternalLink, ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface URL {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export default function URLHistory() {
  const { user } = useUser();
  const [urls, setUrls] = useState<URL[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'clicks'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const userEmail = user?.emailAddresses?.[0]?.emailAddress;
        if (!userEmail) return;

        const response = await axios.get("/api/urls/history", {
          params: { email: userEmail }
        });

        if (response.data.success) {
          setUrls(response.data.urls);
        }
      } catch (error) {
        console.error("Error fetching URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUrls();
    }
  }, [user]);

  const sortUrls = (urls: URL[]) => {
    return [...urls].sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return sortOrder === 'desc' ? b.clicks - a.clicks : a.clicks - b.clicks;
      }
    });
  };

  if (loading) {
    return <div className="ml-64 p-8">Loading...</div>;
  }

  return (
    <div className="ml-64 p-8 min-h-screen bg-black">
      <h1 className="text-4xl font-bold text-gray-300 mb-8">URL History</h1>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
              <Link size={24} />
            </div>
            <div>
              <h2 className="text-gray-300 font-semibold text-xl">All URLs</h2>
              <p className="text-gray-500">Your shortened URL history</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => {
                setSortBy('date');
                setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
              }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                ${sortBy === 'date' ? 'bg-green-500/10 text-green-500' : 'text-gray-500'}`}
            >
              Date <ArrowUpDown size={16} />
            </button>
            <button
              onClick={() => {
                setSortBy('clicks');
                setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
              }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                ${sortBy === 'clicks' ? 'bg-green-500/10 text-green-500' : 'text-gray-500'}`}
            >
              Clicks <ArrowUpDown size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {sortUrls(urls).map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-black/40 
                       border border-gray-800 rounded-lg hover:border-green-500/50 
                       transition-all duration-300"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-2 bg-green-500/5 rounded-md text-green-500">
                  <Link size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-400 text-sm truncate max-w-[500px]">
                    {url.originalUrl}
                  </p>
                  <p className="text-green-500 font-mono text-sm mt-1">
                    {url.shortUrl}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Created {dayjs(url.createdAt).format('MMM D, YYYY [at] h:mm A')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-gray-500 text-sm">Clicks</p>
                  <p className="text-green-500 font-mono">{url.clicks}</p>
                </div>
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-green-500 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          ))}

          {urls.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No URLs found in your history
            </div>
          )}
        </div>
      </div>
    </div>
  );
}