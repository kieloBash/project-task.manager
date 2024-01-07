"use server";

import prisma from "@/lib/prisma";

export async function createProject(name: string) {
  const newProject = await prisma.project.create({
    data: {
      name,
    },
  });

  return newProject;
}

export async function deleteProject(projectId: string) {
  const projectWithMembers = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      members: true,
    },
  });

  if (!projectWithMembers) return false;

  // Remove the project ID from the projectIDs array of each member
  for (let member of projectWithMembers.members) {
    let updatedProjectIDs = member.projectIDs.filter((id) => id !== projectId);

    // Update the user
    await prisma.user.update({
      where: { id: member.id },
      data: { projectIDs: updatedProjectIDs },
    });
  }

  await prisma.project.delete({
    where: { id: projectId },
  });

  return true;
}

export async function updateProjectWTMembers(
  emails: string[],
  projectID: string
) {
  const existingProject = await prisma.project.findFirst({
    where: {
      id: projectID,
    },
  });

  if (!existingProject) return null;

  for (let email of emails) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error(`No user found with email ${email}`);
    }

    const existingMember = await prisma.project.findUnique({
      where: { id: existingProject.id },
      select: { members: true },
    });

    if (
      existingMember &&
      existingMember.members.some((member) => member.id === user.id)
    ) {
      continue;
    }

    await prisma.project.update({
      where: { id: existingProject.id },
      data: {
        members: {
          connect: { id: user.id },
        },
      },
    });
  }
  return true;
}

export async function fetchProjects() {
  const allProjectsWithMembers = await prisma.project.findMany({
    include: {
      members: true,
    },
  });
  return allProjectsWithMembers;
}

export async function fetchUsers() {
  const data = await prisma.user.findMany({
    include: {
      projects: true,
    },
  });
  return data;
}
