"use client";
import React, { useState } from "react";
import Link from 'next/link';
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className="MenuContainer">
        <Link href="/">
          <img src="/headerImg.png" alt="Logo" className="headerlogo" />
        </Link>
        <nav className={`top-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/BrowsePage">BROWSE</Link>
            </li>
            <li>
              <Link href="/pages/Library">MY BOOKS</Link>
            </li>
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <img src="/menu-icon.svg" alt="Menu" />
        </button>
      </header>
    </>
  );
};

export default Header;
