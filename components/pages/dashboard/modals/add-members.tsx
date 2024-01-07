"use client";

import * as React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Loader2, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// BACKEND
import { useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/lib/useDebounce";
import useFetchUsers from "../hooks/fetchUsers";
import { ProfileAvatar } from "@/components/global/profile-avatars";
import { useDashboardContext } from "../context";
import { Label } from "@/components/ui/label";
import { updateProjectWTMembers } from "../action";
import dayjs from "dayjs";
import { toast } from "sonner";

export function AddMembers() {
  const [value, setValue] = React.useState<
    { _id: string; email: string; image: string }[]
  >([]);
  const { setSelectedProject, setToggleAddMembers, selectedProject } =
    useDashboardContext();
  // console.log(userInfo);
  const [isLoading, setIsLoading] = React.useState(false);

  const [stringVal, setStringVal] = React.useState("");
  const debouncedVal = useDebounce(stringVal, 500);

  const options = useFetchUsers();
  const queryClient = useQueryClient();

  async function handleCreate() {
    if (!value) return;
    setIsLoading(true);
    const res = await updateProjectWTMembers(
      value.map((d) => {
        return d.email;
      }) || [],
      selectedProject?.id as string
    );

    if (res) {
      queryClient.invalidateQueries({
        queryKey: [`projects`],
      });

      toast(`Project members updated`, {
        description: `${dayjs().format("dddd, MMMM D, YYYY at h:mm A")}`,
      });

      setSelectedProject(undefined);
      setToggleAddMembers(false);
    }
    setIsLoading(false);
  }

  return (
    <section className="fixed inset-0 z-[100] flex justify-center items-center bg-black/40">
      <div className="flex flex-col w-full max-w-lg gap-4 p-4 bg-white rounded-xl">
        <Label className="text-lg font-semibold">{selectedProject?.name}</Label>
        <div className="flex items-center px-3 border-b">
          <Search className="w-4 h-4 mr-2 opacity-50 shrink-0" />
          <input
            className="flex w-full py-3 text-sm bg-transparent rounded-md outline-none h-11 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search a user..."
            value={stringVal}
            onChange={(e) => setStringVal(e.target.value)}
          />
        </div>

        {options?.isLoading ? (
          <div className="flex items-center justify-center flex-1 w-full">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <>
            {options?.data?.length === 0 ? (
              <>
                <div className="w-full border rounded-md h-80">
                  <div className="p-4 text-center">No Users found</div>
                </div>
              </>
            ) : (
              <>
                <ScrollArea className="w-full border rounded-md h-80">
                  <div className="p-4">
                    {options?.data?.map((user) => {
                      const isActive = value.find((d) => d._id === user.id)
                        ? true
                        : false;

                      return (
                        <button
                          type="button"
                          key={user.id}
                          className="relative flex items-center justify-start w-full px-4 py-2 space-x-4 text-left transition rounded-md hover:bg-slate-100"
                          onClick={() => {
                            let temp = isActive
                              ? value.filter((d) => d._id !== user.id)
                              : [
                                  ...value,
                                  {
                                    _id: user.id as string,
                                    email: user.email,
                                    image: user.image,
                                  },
                                ];
                            setValue(temp);
                          }}
                        >
                          <ProfileAvatar src={user.image} name={user.name} />
                          <div className="w-full">
                            <div className="flex items-center justify-between w-full">
                              <p className="text-sm font-medium leading-none">
                                {user.name}
                              </p>
                            </div>
                            <p className="text-sm text-left text-muted-foreground line-clamp-1">
                              {user.email}
                            </p>
                          </div>
                          {isActive && (
                            <Check className="absolute w-5 h-5 -translate-y-1/2 right-4 top-1/2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </>
            )}
          </>
        )}
        <DialogFooter className="flex items-center justify-between w-full">
          <p className="flex-1 text-sm text-left">
            {value ? (
              <div className="flex -space-x-4">
                {value.map((p) => (
                  <ProfileAvatar key={p._id} src={p.image} name={p.email} />
                ))}
              </div>
            ) : (
              "Select a user to contact"
            )}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              disabled={!value || isLoading}
              onClick={handleCreate}
            >
              Confirm{" "}
              {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setSelectedProject(undefined);
                setToggleAddMembers(false);
              }}
              variant={"outline"}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </div>
    </section>
  );
}
