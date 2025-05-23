"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Link as LinkIcon,
  History,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-7 z-50 p-2 bg-black rounded-full border border-gray-800 text-gray-400 hover:text-green-500 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`lg:flex h-screen w-64 bg-black border-r border-gray-800 fixed left-0 top-14 p-6 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col gap-8">
          <div className="mb-8">
            <Link href={"/"} className="text-green-500 text-3xl font-bold pl-3">
              Brevify
            </Link>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="/dashboard"
              onClick={() => handleNavigation("/dashboard")}
              className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors p-3 rounded-lg hover:bg-gray-900"
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              href="/url-shorten"
              onClick={() => handleNavigation("/url-shorten")}
              className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors p-3 rounded-lg hover:bg-gray-900"
            >
              <LinkIcon size={20} />
              <span className="font-medium">Shorten URL</span>
            </Link>

            <Link
              href="/url-history"
              onClick={() => handleNavigation("/url-history")}
              className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors p-3 rounded-lg hover:bg-gray-900"
            >
              <History size={20} />
              <span className="font-medium">URL History</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
