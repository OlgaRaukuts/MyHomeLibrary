"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./header.css";
import LoadingScreen from "../../components/loadingscreen/loadingscreen";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  const handleNavigation = (path: string) => {
    setLoading(true); //Обычно это используется, чтобы показать спиннер или индикатор загрузки на экране.
    setTimeout(() => {
      router.push(path); //выполняет переход на новую страницу по указанному маршруту path.
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="MenuContainer">
        <a href="/">
          <img src="/headerImg.png" alt="Logo" className="headerlogo" />
        </a>
        <nav className={`top-nav ${menuOpen ? "open" : ""}`}> 
          <ul>
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/pages/BrowsePage">BROWSE</a>
            </li>
            <li>
              <a href="/pages/ContactUS">MY BOOKS</a>
            </li>
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <img src="/menu-icon.svg" alt="Menu" />
        </button>
      </div>
    </>
  );
};

export default Header;
