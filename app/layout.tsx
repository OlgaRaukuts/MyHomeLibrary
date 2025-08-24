import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/global.css";
import { AuthProvider } from "./context/authContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js App with Tailwind + daisyUI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-base-200">
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
