import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-base-100 text-gray-800 p-8 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Левая колонка: Информация о проекте */}
        <div className="flex-1">
          <img src="/footerImage.png" alt="footerImage" className="h-24 mb-4" />
          <p className="mb-4">
            Home Library is a resource for putting all your books you have at home in one place. 
            To track, gather and evaluate your books!
          </p>
          <p className="mb-2">
            <b className="text-yellow-500">Email:</b> support@HomeLibrary.com
          </p>
          <p className="mb-2">
            <b className="text-yellow-500">Phone:</b> +31645
          </p>
          <p className="mb-2">
            <b className="text-yellow-500">Address:</b> Haarlem, The Netherlands
          </p>
          <p className="mt-4 text-sm">All rights reserved @HomeLibrary 2024</p>
        </div>

        {/* Правая колонка: Быстрые ссылки */}
        <div className="flex-1">
          <h5 className="text-yellow-500 mb-4 text-lg font-semibold">Quick Links</h5>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-primary">Home</Link>
            </li>
            <li>
              <Link href="/MyBooks" className="hover:text-primary">My Books</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
