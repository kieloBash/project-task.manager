import { Prisma } from "@prisma/client";

export type User = {
  id: string;
  email: string;
  name: string | null;
  clerkId: string;
  image: string;
  projectIDs: string[];
  tasksIDs: string[];
};

export type Project = {
  id: string;
  name: string;
  membersIDs: string[];
};

export type ProjectWithMembers = Prisma.ProjectGetPayload<{
  include: {
    members: true;
  };
}>;
