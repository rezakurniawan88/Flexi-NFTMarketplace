import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useFetchUserData() {
  const { data: session } = useSession();
  
  return useQuery({
    queryKey: ["userData"],
    queryFn: async() => {
        const response = await axiosInstance.get(`/user/${session?.user?.walletAddress}`);
        return response?.data?.data;
    },
    enabled: !!session?.user?.walletAddress,
  })
}
