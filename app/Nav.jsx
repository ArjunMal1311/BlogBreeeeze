"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { TbSearch } from "react-icons/tb";

export default function Nav({ currentUser }) {
  return (
    <nav className="flex justify-between items-center w-full p-7">
      <Link
        className="font-extrabold leading-[1.15] text-black sm:text-2xl blue_gradient"
        href="/"
      >
        BlogBreeeeze
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {currentUser ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/myprofile"
              className="flex items-center font-semibold blue_gradient border p-2 rounded-lg"
            >
              Hello, {currentUser.name}
            </Link>
            <Link href="/search" className="border p-2 rounded-lg">
              <TbSearch size={20} />
            </Link>
            <Link
              href="/create"
              className="hover:scale-105 font-semibold green_gradient border p-2 rounded-lg"
            >
              Upload Blog
            </Link>

            <Link
              href="/myblogs"
              className="hover:scale-105 font-semibold green_gradient border p-2 rounded-lg"
            >
              My Blogs
            </Link>

            <Link
              href="/"
              className="hover:scale-105 font-semibold green_gradient border p-2 rounded-lg"
              onClick={() => {
                signOut();
                router.refresh();
              }}
            >
              SignOut
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/search" className="border p-2 rounded-lg">
              <TbSearch size={20} />
            </Link>

            <Link
              href="/create"
              className="hover:scale-105 font-semibold green_gradient border p-2 rounded-lg"
            >
              Upload Blog
            </Link>

            <Link
              href="/sign"
              className="hover:scale-105 font-semibold green_gradient border p-2 rounded-lg"
            >
              SignIn
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
