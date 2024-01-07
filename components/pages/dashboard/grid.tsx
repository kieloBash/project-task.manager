"use client";
import React from "react";

// UI
import Loading from "@/components/global/loading";
import ProjectCard from "./cards/project-card";
import { AddProjectModal } from "./modals/add-project";

// BACKEND
import useFetchProjects from "./hooks/fetchProjects";
import { AddMembers } from "./modals/add-members";
import { useDashboardContext } from "./context";

const ProjectGrid = () => {
  const projects = useFetchProjects();
  const { toggleAddMembers, selectedProject } = useDashboardContext();
  return (
    <>
      {toggleAddMembers && selectedProject && <AddMembers />}
      <section className="flex-1 w-full h-full px-2">
        {projects.isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <article className="grid w-full grid-flow-row grid-cols-2 gap-4 mt-4 lg:grid-cols-4 md:grid-cols-3">
            {projects.data?.map((p, index) => {
              return <ProjectCard data={p} key={index} />;
            })}
            <AddProjectModal />
          </article>
        )}
      </section>
    </>
  );
};

export default ProjectGrid;
