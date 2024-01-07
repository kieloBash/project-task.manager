import type { Metadata } from "next";
import LeftSideBar from "./leftsidebar";
import { QueryProvider } from "@/providers/QueryProvider";

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
    <QueryProvider>
      <section className="relative flex w-screen min-h-[calc(100vh)] pl-[17rem] pt-[1rem] bg-gradient-to-r from-cyan-500 to-blue-500">
        <LeftSideBar />
        <div className="flex-1 w-full p-8 bg-white rounded-t-2xl">{children}</div>
      </section>
    </QueryProvider>
  );
}
