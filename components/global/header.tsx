import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SendHorizonal } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="fixed z-[100] opacity-95 backdrop-blur-sm top-0 left-0 flex items-center justify-between w-screen h-20 p-4 bg-gradient-to-r from-cyan-500 to-blue-500">
      <Link href={"/"} className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center p-2.5 text-white border-2 border-white rounded-full w-12 h-12">
          <SendHorizonal className="w-full h-full" />
        </div>
        <h1 className="text-3xl font-black text-white">ProTask</h1>
      </Link>
      <SignedIn>
        <UserButton
          afterSignOutUrl={"/"}
          appearance={{
            elements: {
              userButtonAvatarBox: "w-12 h-12 border-2 border-white",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <Button className="px-6 text-base font-medium text-white">
          <SignInButton />
        </Button>
      </SignedOut>
    </header>
  );
};

export default Header;
