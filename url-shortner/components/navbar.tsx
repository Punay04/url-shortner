"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-row w-full p-5 m-0">
      <Link href={"/"} className="text-green-500 text-3xl font-bold">
        Brevify
      </Link>
      <div className="flex justify-end w-full gap-3">
        {!isSignedIn && (
          <>
            <Link
              href={"/register"}
              className="text-blue-400 font-semibold cursor-pointer border p-2 rounded-md"
            >
              Register
            </Link>
            <Link
              href={"/login"}
              className="text-gray-900 bg-blue-300 font-semibold cursor-pointer border p-2 rounded-md"
            >
              Login
            </Link>
          </>
        )}
        {isSignedIn && <UserButton />}
      </div>
    </div>
  );
};

export default Navbar;
