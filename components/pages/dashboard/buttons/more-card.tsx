"use client";
import React, { useState } from "react";

// UI
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Delete, MoreVerticalIcon, UserPlus2Icon } from "lucide-react";

// BACKEND
import dayjs from "dayjs";
import { ProjectWithMembers } from "@/lib/types";
import { deleteProject } from "../action";
import { useQueryClient } from "@tanstack/react-query";
import { useDashboardContext } from "../context";

const MoreCardDropdown = ({ data }: { data: ProjectWithMembers }) => {
  const { setSelectedProject, setToggleAddMembers } = useDashboardContext();
  const queryClient = useQueryClient();

  async function handleDelete() {
    const res = await deleteProject(data.id);
    if (res) {
      toast(`Project deleted: ${data.name}`, {
        description: `${dayjs().format("dddd, MMMM D, YYYY at h:mm A")}`,
        // action: {
        //   label: "Undo",
        //   onClick: () => console.log("Undo"),
        // },
      });
      queryClient.invalidateQueries({
        queryKey: [`projects`],
      });
    } else {
      toast(`Error deleting`, {
        description: `${dayjs().format("dddd, MMMM D, YYYY at h:mm A")}`,
      });
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="absolute right-1 w-6 h-6 p-0.5 top-4"
        >
          <MoreVerticalIcon className="w-full h-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setSelectedProject(data);
            setToggleAddMembers(true);
          }}
        >
          <UserPlus2Icon className="w-4 h-4 mr-2" />
          <span>Add Members</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Delete className="w-4 h-4 mr-2" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreCardDropdown;
