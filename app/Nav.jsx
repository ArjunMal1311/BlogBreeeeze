"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  TbArrowRight,
  TbCross,
  TbMenu,
  TbNavigationOff,
  TbScaleOutline,
  TbSearch,
} from "react-icons/tb";
import { useState } from "react";

export default function Nav({ currentUser }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Initialize state for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state
  };
  return (
    <nav className="flex justify-between items-center w-full p-7">
      <Link
        className="font-extrabold leading-[1.15] text-black sm:text-2xl blue_gradient"
        href="/"
      >
        BlogBreeeeze
      </Link>

      <div className="sm:hidden">
        <button className="text-black p-2" onClick={toggleMobileMenu}>
          {!isMobileMenuOpen ? <TbMenu size={20} /> : <TbArrowRight size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border rounded-lg shadow-md">
          <div className="px-4 py-2 flex flex-col items-center">
            {currentUser ? (
              <>
                <Link
                  href="/myprofile"
                  className="block font-semibold text-blue-500 p-2 rounded-lg mb-2 hover:bg-blue-100"
                >
                  Hello, {currentUser.name}
                </Link>
                {/* Other links */}
                <Link
                  href="/"
                  className="block font-semibold text-green-500 p-2 rounded-lg hover:bg-green-100"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Sign Out
                </Link>
              </>
            ) : (
              <Link
                href="/sign"
                className="block font-semibold text-green-500 p-2 rounded-lg hover:bg-green-100"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/search"
              className="block p-2 rounded-lg hover:bg-gray-100"
            >
              <TbSearch size={20} />
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          {currentUser && (
            <>
              <Link
                href="/myprofile"
                className="flex items-center font-semibold blue_gradient border p-2 rounded-lg"
              >
                Hello, {currentUser.name}
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
            </>
          )}

          <Link href="/search" className="border p-2 rounded-lg">
            <TbSearch size={20} />
          </Link>

          {!currentUser && (
            <Link
              href="/sign"
              className="hover:scale-105 font-semibold green_gradient border p-2 rounded-lg"
            >
              SignIn
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
