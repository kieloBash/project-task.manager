"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../action";

const useFetchProjects = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`projects`],
    queryFn: async () => {
      const data = await fetchProjects();

      return data;
    },
  });
  return { data, isLoading };
};

export default useFetchProjects;
