"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Footer = () => {
  const { isSignedIn } = useUser();

  return (
    <footer className="mt-20 md:mt-50 px-4 py-8 md:py-12">
      <p className="text-gray-300 text-xl md:text-2xl lg:text-3xl text-center max-w-3xl mx-auto">
        Make long URLs short, simple, and trackable.
      </p>
      <div className="flex justify-center items-center mt-6 md:mt-8">
        {!isSignedIn && (
          <Link
            href={"/login"}
            className="text-blue-300 text-lg md:text-xl font-semibold cursor-pointer border p-2 md:p-3 rounded-md hover:bg-blue-300 hover:text-white transition-colors"
          >
            Get Started
          </Link>
        )}
        {isSignedIn && (
          <Link
            href={"/dashboard"}
            className="text-blue-300 text-lg md:text-xl font-semibold cursor-pointer border p-2 md:p-3 rounded-md hover:bg-blue-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        )}
      </div>
    </footer>
  );
};

export default Footer;
