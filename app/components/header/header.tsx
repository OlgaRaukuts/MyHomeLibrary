"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import "./header.css";
import LoadingScreen from "../../components/loadingscreen/loadingscreen";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
          <img src="/logo.png" alt="Logo" className="headerlogo" />
        </a>
        <nav className={`top-nav ${menuOpen ? "open" : ""}`}> // Навигационное меню. Если menuOpen === true, то к классу top-nav добавляется "open", что, вероятно, делает меню видимым на мобильных устройствах (бургер-меню).
          <ul>
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/pages/BrowsePage">BROWSE</a>
            </li>
            <li>
              <a href="/pages/AboutUs">ABOUT US</a>
            </li>
            <li>
              <a href="/pages/ContactUS">CONTACT US</a>
            </li>
          </ul>
        </nav>
        <button
          className="sellbutton"
          onClick={() =>
            handleNavigation(
              user
                ? `/pages/SellerDashboard/${user.uid}/AddBook/`
                : "/pages/LoginPages/userlogin/"
            )
          }
        >
          SELL A BOOK
        </button>
        <a
          onClick={() =>
            handleNavigation(
              user
                ? `/pages/chats/${user.uid}/ChatPage`
                : "/pages/LoginPages/userlogin/"
            )
          }
          style={{ cursor: "pointer" }}
        >
          <img src="/chat.png" className="chat" alt="Chat" />
        </a>
        <a href="/pages/LoginPages/userlogin">
          <img src="/acc.svg" className="acc" alt="Account" />
        </a>
        <button className="menu-toggle" onClick={toggleMenu}>
          <img src="/menu-icon.svg" alt="Menu" />
        </button>
      </div>
    </>
  );
};

export default Header;
