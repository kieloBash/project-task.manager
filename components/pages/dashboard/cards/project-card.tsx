"use client";
import React from "react";
import { ProfileAvatar } from "@/components/global/profile-avatars";
import { Label } from "@/components/ui/label";
import { Circle } from "lucide-react";
import { ProjectWithMembers } from "@/lib/types";
import MoreCardDropdown from "../buttons/more-card";

const ProjectCard = ({ data }: { data: ProjectWithMembers }) => {
  return (
    <div className="w-full border flex flex-col justify-between rounded-lg h-[15rem] p-6 relative">
      <MoreCardDropdown data={data} />
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">{data.name}</h2>
        <p className="flex gap-2 text-slate-500">
          <div className="flex items-center justify-center gap-1">
            <Circle className="w-4 h-4 text-green-400 fill-green-400" />
            <Label>{} Done</Label>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Circle className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Label>{} Pending</Label>
          </div>
        </p>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex -space-x-3">
          {data.members.map((member, index) => {
            if (index < 3)
              return (
                <ProfileAvatar
                  key={index}
                  src={member.image}
                  name={member.name}
                />
              );
          })}
          {data.members.length > 3 && (
            <div className="z-10 flex items-center justify-center w-10 h-10 border-2 border-white rounded-full bg-slate-200">
              {data.members.length - 3}+
            </div>
          )}
        </div>
        <Label>{data.members.length} Members</Label>
      </div>
    </div>
  );
};

export default ProjectCard;
