import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import React from "react";

async function createNewUser(email: string, name: string, clerkId: string) {
  if (email === "" && name === "" && clerkId === "") return;

  const existing = await prisma.user.findFirst({ where: { email } });

  if (existing) return existing;
  const newUser = await prisma.user.create({
    data: { email, name, clerkId },
  });

  return newUser;
}
const DashboardPage = async () => {
  const user = await currentUser();

  await createNewUser(
    user?.emailAddresses[0].emailAddress || "",
    user?.firstName || "",
    user?.id || ""
  );

  return <div className="">DashboardPage</div>;
};

export default DashboardPage;
