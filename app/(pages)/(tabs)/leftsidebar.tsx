"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, UserButton } from "@clerk/nextjs";

// UI
import { LayoutGridIcon, ProjectorIcon } from "lucide-react";

const LeftSideBar = () => {
  const LINKS = [
    { label: "dashboard", href: "/dashboard", icon: LayoutGridIcon },
    { label: "projects", href: "/projects", icon: ProjectorIcon },
  ];
  const pathname = usePathname();
  return (
    <article className="fixed top-0 left-0 flex flex-col h-screen gap-4 w-64 px-4 z-[10] py-[1rem]">
      <SignedIn>
        <div className="flex items-center justify-start gap-4 mb-4">
          <UserButton
            afterSignOutUrl={"/"}
            appearance={{
              elements: {
                userButtonAvatarBox: "w-12 h-12 border-2 border-white",
              },
            }}
          />
          <Link href={"/dashboard"}>
            <h1 className="text-3xl font-black text-white">ProTask</h1>
          </Link>
        </div>
      </SignedIn>
      <ul className="w-full">
        {LINKS.map((tab, index) => {
          const active = pathname.includes(tab.label);
          const activeClass = active ? "text-white" : "hover:bg-slate-200";
          return (
            <Link href={tab.href} key={index}>
              <li
                className={`${activeClass} flex items-center justify-start w-full gap-4 p-2 capitalize transition-colors rounded-md`}
              >
                {<tab.icon className="" />}
                {tab.label}
              </li>
            </Link>
          );
        })}
      </ul>
    </article>
  );
};

export default LeftSideBar;
