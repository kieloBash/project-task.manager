"use client";
import { ProjectWithMembers } from "@/lib/types";
import * as React from "react";

export type DashboardContextType = {
  selectedProject: ProjectWithMembers | undefined;
  setSelectedProject: (e: ProjectWithMembers | undefined) => void;

  toggleAddMembers: boolean;
  setToggleAddMembers: (e: boolean) => void;
};

export const DashboardContext = React.createContext<DashboardContextType>({
  selectedProject: undefined,
  setSelectedProject: (e: ProjectWithMembers | undefined) => {},

  toggleAddMembers: false,
  setToggleAddMembers: (e: boolean) => {},
});

export const useDashboardContext = () => React.useContext(DashboardContext);

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedProject, setSelectedProject] = React.useState<
    ProjectWithMembers | undefined
  >();
  const [toggleAddMembers, setToggleAddMembers] =
    React.useState<boolean>(false);

  return (
    <DashboardContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        toggleAddMembers,
        setToggleAddMembers,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
