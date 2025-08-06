import React from "react";
import Link from "next/link";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="FooterContainer">
        <div className="BookInfo">
          <img src="/footerImage.png" alt="footerImage" className="footerImage"></img>
          <p className="about">
            Home Library is resource for putting all your books you have at home in one place. To track, 
            to gather and to evaluate/estimate your books! 
          </p>
          <p className="contactf">
            <b style={{ color: "#F4AD0F" }}>Email:</b> support@HomeLibrary.com
            <br />
            <b style={{ color: "#F4AD0F" }}>Phone:</b> +31645
            <br />
            <b style={{ color: "#F4AD0F" }}>Address:</b> Haarlem, The Netherlands
            <br />
          </p>

          <p className="reserve">All rights reserved @HomeLibrary 2024</p>
        </div>

        <div className="Links">
          <h5 style={{ color: "#F4AD0F" }}>Quick Links</h5>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/BrowsePage">Browse</Link>
            </li>
              <li>
              <Link href="/MyBooks">My Books</Link>
            </li>
            <li>
              <Link href="/ContactUs">Contact Us</Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
