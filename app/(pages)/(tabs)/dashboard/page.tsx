import DashboardProvider from "@/components/pages/dashboard/context";
import SearchForm from "@/components/pages/dashboard/form";
import ProjectGrid from "@/components/pages/dashboard/grid";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import React from "react";

async function createNewUser(
  email: string,
  name: string,
  clerkId: string,
  image: string
) {
  if (email === "" && name === "" && clerkId === "") return;

  const existing = await prisma.user.findFirst({ where: { email } });

  if (existing) return existing;
  const newUser = await prisma.user.create({
    data: { email, name, clerkId, image },
  });

  return newUser;
}
const DashboardPage = async () => {
  const user = await currentUser();
  await createNewUser(
    user?.emailAddresses[0].emailAddress || "",
    user?.firstName || "",
    user?.id || "",
    user?.hasImage ? user?.imageUrl || "" : ""
  );

  return (
    <DashboardProvider>
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="mt-2 text-sm">
              Here is the dashboard for searching projects or adding projects to
              manage.
            </p>
          </div>
          <SearchForm />
        </div>
        <ScrollArea className="w-full h-[calc(100vh-9rem)] py-2">
          <ProjectGrid />
        </ScrollArea>
      </div>
    </DashboardProvider>
  );
};

export default DashboardPage;
