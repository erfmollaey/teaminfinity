import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import GlobalCanvas from "@/components/ui/GlobalCanvas";
import { Inter } from "next/font/google";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Infinity™ | Limitless Tech",
  description: "Next-gen Digital Experiences",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "900"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#050505] text-white antialiased`}>
        <Navbar />
        <GlobalCanvas />
        <main>{children}</main>
      </body>
    </html>
  );
}