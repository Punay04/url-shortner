import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

const Footer = () => {
  const user = auth();

  return (
    <div className="mt-50">
      <p className="text-gray-300 text-3xl text-center">
        Make long URLs short, simple, and trackable.
      </p>
      <div className="flex justify-center items-center mt-7">
        {!user && (
          <Link
            href={"/login"}
            className="text-blue-300 text-xl font-semibold cursoor-pointer border p-2 rounded-md"
          >
            Get Started
          </Link>
        )}
        <Link
            href={"/login"}
            className="text-blue-300 text-xl font-semibold cursoor-pointer border p-2 rounded-md"
          >
            Dashboard
          </Link>
      </div>
    </div>
  );
};

export default Footer;
