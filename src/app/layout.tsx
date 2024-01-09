"use client";

import Footer from "@/components/layout/Footer";
import store from "@/redux/store";
import Navbar from "components/layout/Navbar";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "../styles/_basket.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />

          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
