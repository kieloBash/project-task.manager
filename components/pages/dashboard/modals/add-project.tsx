"use client";

// UI
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import Loading from "@/components/global/loading";

// BACKEND
import { createProject } from "../action";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import dayjs from "dayjs";

export function AddProjectModal() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name === "") return;
    setIsLoading(true);

    const res = await createProject(name);

    if (res) {
      setIsLoading(false);
      setOpen(false);

      toast(`New Project has been made: ${name}`, {
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
      toast(`Error creating`, {
        description: `${dayjs().format("dddd, MMMM D, YYYY at h:mm A")}`,
      });
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={() => {}}
          className="w-full border rounded-lg h-[15rem] flex justify-center items-center hover:bg-slate-100 text-slate-400 transition-colors"
        >
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>Add a new project to manage</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Loading /> : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
