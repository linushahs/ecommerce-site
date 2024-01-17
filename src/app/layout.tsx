"use client";

import { Toaster } from "@/components/common/Toaster";
import Footer from "@/components/layout/Footer";
import { store } from "@/redux/store";
import Navbar from "components/layout/Navbar";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
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
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <Navbar />

          <main className="min-h-screen">{children}</main>
          <Footer />
          {/* </PersistGate> */}
        </Provider>

        <Toaster richColors />
      </body>
    </html>
  );
}
