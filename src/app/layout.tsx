"use client";

import Footer from "@/components/layout/Footer";
import { persistor, store } from "@/redux/store";
import Navbar from "components/layout/Navbar";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "../styles/_basket.css";
import "./globals.css";
import { Toaster } from "@/components/common/Toaster";
import { PersistGate } from "redux-persist/integration/react";

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
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <Navbar />

          {children}
          <Footer />
          {/* </PersistGate> */}
        </Provider>

        <Toaster richColors />
      </body>
    </html>
  );
}
