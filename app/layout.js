import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./lib/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GadgetInSpot – E-Commerce Store",
  description:
    "GadgetInSpot is a modern e-commerce platform to explore and shop the latest tech gadgets and electronics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
            {children}
        </CartProvider>
      </body>
    </html>
  );
}
