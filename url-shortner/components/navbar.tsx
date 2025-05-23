"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full p-4 md:p-5">
      <div className="flex items-center justify-between">
        <Link
          href={"/"}
          className="text-green-500 text-2xl md:text-3xl font-bold"
        >
          Brevify
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-3">
          {!isSignedIn && (
            <>
              <Link
                href={"/register"}
                className="text-blue-400 font-semibold cursor-pointer border p-2 rounded-md hover:bg-blue-400 hover:text-white transition-colors"
              >
                Register
              </Link>
              <Link
                href={"/login"}
                className="text-gray-900 bg-blue-300 font-semibold cursor-pointer border p-2 rounded-md hover:bg-blue-400 hover:text-white transition-colors"
              >
                Login
              </Link>
            </>
          )}
          {isSignedIn && <UserButton />}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          {!isSignedIn && (
            <>
              <Link
                href={"/register"}
                className="block text-blue-400 font-semibold cursor-pointer border p-2 rounded-md hover:bg-blue-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                href={"/login"}
                className="block text-gray-900 bg-blue-300 font-semibold cursor-pointer border p-2 rounded-md hover:bg-blue-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
          {isSignedIn && (
            <div className="flex justify-center">
              <UserButton />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
