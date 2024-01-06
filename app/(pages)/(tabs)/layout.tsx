import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftSideBar from "./leftsidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex w-screen min-h-[calc(100vh-5rem)] pl-[21rem] pr-[1rem] py-[1rem]">
      <LeftSideBar />
      {children}
    </section>
  );
}
