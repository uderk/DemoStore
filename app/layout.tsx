import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PowerTools Store - Buy Quality Tools Online",
  description: "Professional power tools for professionals and DIY enthusiasts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
