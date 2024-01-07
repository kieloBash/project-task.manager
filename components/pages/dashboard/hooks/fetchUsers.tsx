"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../action";

const useFetchUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`users:all`],
    queryFn: async () => {
      const data = await fetchUsers();

      return data;
    },
  });
  return { data, isLoading };
};

export default useFetchUsers;
