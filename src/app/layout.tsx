import { Toaster } from "@/components/common/Toaster";
import Footer from "@/components/layout/Footer";
import Navbar from "components/layout/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />

          <main className="min-h-screen">{children}</main>
          <Footer />
        </ReduxProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
