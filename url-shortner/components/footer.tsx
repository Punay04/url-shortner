"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Footer = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="mt-50">
      <p className="text-gray-300 text-3xl text-center">
        Make long URLs short, simple, and trackable.
      </p>
      <div className="flex justify-center items-center mt-7">
        {!isSignedIn && (
          <Link
            href={"/login"}
            className="text-blue-300 text-xl font-semibold cursor-pointer border p-2 rounded-md"
          >
            Get Started
          </Link>
        )}
        {isSignedIn && (
          <Link
            href={"/dashboard"}
            className="text-blue-300 text-xl font-semibold cursor-pointer border p-2 rounded-md"
          >
            Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default Footer;
