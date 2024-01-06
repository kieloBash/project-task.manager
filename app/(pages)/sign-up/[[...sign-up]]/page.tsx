import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-5rem)]">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
