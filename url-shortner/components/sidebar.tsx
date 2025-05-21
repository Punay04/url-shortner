"use client"
import Link from "next/link";
import React from "react";
import { LayoutDashboard, Link as LinkIcon, History } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-black border-r border-gray-800 fixed left-0 top-0 p-6">
      <div className="flex flex-col gap-8">
        <div className="mb-8">
          <Link href={"/"} className="text-green-500 text-3xl font-bold pl-3">
            Brevify
          </Link>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors p-3 rounded-lg hover:bg-gray-900"
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            href="/url-shorten"
            className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors p-3 rounded-lg hover:bg-gray-900"
          >
            <LinkIcon size={20} />
            <span className="font-medium">Shorten URL</span>
          </Link>

          <Link
            href="/url-history"
            className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors p-3 rounded-lg hover:bg-gray-900"
          >
            <History size={20} />
            <span className="font-medium">URL History</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
