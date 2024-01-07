"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchForm = () => {
  return (
    <form>
      <div className="relative">
        <Search className="absolute w-4 h-4 -translate-y-1/2 left-2 top-1/2 text-muted-foreground" />
        <Input placeholder="Search a Project" className="pl-8" />
      </div>
    </form>
  );
};

export default SearchForm;
