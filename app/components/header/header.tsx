"use client";

import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <img src="/headerImg.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        <nav
          className={`flex-col md:flex md:flex-row md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-base-100 md:bg-transparent transition-all duration-300 ${
            menuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-0">
            <li>
              <Link href="/HomePage" className="btn btn-ghost btn-sm md:btn-md">
                HOME
              </Link>
            </li>
            <li>
              <Link href="/library" className="btn btn-ghost btn-sm md:btn-md">
                MY BOOKS
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="md:hidden btn btn-square btn-ghost"
          onClick={toggleMenu}
        >
          <img src="/menu-icon.svg" alt="Menu" className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
