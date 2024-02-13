import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "./App.css";
import { Open_Sans } from "next/font/google";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ScrollToAnchor from "./components/ScrollToAnchor";
import ScrollToTop from "./components/ScrollToTop";
import QueryProvider from "@/app/(landing)/main";

const font = Open_Sans({ subsets: ["latin"] });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Avita Health",
  description: "Online Doctor Booking, Medical Tests, Telehealth Services",
};

export const viewport: Viewport = {
  themeColor: "#004680",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>
          <ScrollToTop />
          <ScrollToAnchor />
          <NavBar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
