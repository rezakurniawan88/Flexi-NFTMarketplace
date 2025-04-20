"use client"

import Footer from "@/components/footer";
import Header from "@/components/header";
import { toast } from "@/hooks/use-toast";
import useFetchUserData from "@/hooks/useFetchUserData";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { LucideLoader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AccountSettingsPage() {
    const { data: session } = useSession();
    const { data: dataUser, isPending: fetchUserLoading, refetch: refetchUserData } = useFetchUserData();
    const acronymUser = dataUser?.username?.split(/\s+/g).slice(0, 2).map((word: string | number[]) => word[0]).join('').toUpperCase();
    const [username, setUsername] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const { mutate: onUpdateUsername, isPending: updateUsernameIsLoading } = useMutation({
        mutationKey: ["updateUsername"],
        mutationFn: async () => {
            const response = await axiosInstance.post("/profile/update", {
                email: session?.user?.email,
                username
            });
            return response?.data?.message;
        },
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: data,
                className: "bg-[#110823] text-gray-200 border border-purple-800/40",
            });
            setUsername("");
            refetchUserData();
        },
        onError: (error) => {
            console.log(error);
            toast({
                title: "Error",
                description: "Update username failed",
                variant: "destructive",
            })
        }
    })

    return (
        <main className="min-h-screen bg-darkprimary text-white pt-20">
            <Header />
            <div className="mx-8 sm:mx-12 my-6 sm:my-10">
                <h1 className="font-bold text-2xl sm:text-3xl text-purple-500 mb-6 sm:mb-10">Account Settings</h1>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12 bg-[#1d0d3a]/50 px-8 py-12 sm:py-8 rounded-xl sm:rounded-lg shadow-lg mb-10">
                    {fetchUserLoading ? (
                        <>
                            <div className="w-36 h-36 sm:w-40 sm:h-40 flex justify-center items-center bg-[#241149] rounded-full animate-pulse" />
                            <div className="space-y-3 w-full sm:w-auto">
                                <div className="mx-auto sm:mx-0 bg-[#241149] w-52 h-10 rounded-md animate-pulse" />
                                <div className="bg-[#241149] w-full sm:w-72 h-10 rounded-md animate-pulse" />
                                <div className="bg-[#241149] w-full sm:w-80 h-10 rounded-md animate-pulse" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-36 h-36 sm:w-40 sm:h-40 flex justify-center items-center bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white text-4xl sm:text-5xl font-semibold rounded-full">{acronymUser}</div>
                            <div className="space-y-3 sm:space-y-2.5 text-center sm:text-left px-2 sm:px-0">
                                <h1 className="text-gray-400 font-bold text-2xl mb-6 sm:mb-4">{dataUser?.username || "Guest"}</h1>
                                <div className="text-left">
                                    <h1 className="text-gray-400 font-bold text-sm">Email :</h1>
                                    <h1 className="text-gray-500 text-base break-all">{dataUser?.email || "guest@email.com"}</h1>
                                </div>
                                <div className="text-left">
                                    <h1 className="text-gray-400 font-bold text-sm">Wallet Address :</h1>
                                    <div className="flex items-center gap-1 mt-1">
                                        <svg fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 -ml-1 flex-shrink-0"><path d="M18.527 12.2062L12 16.1938L5.46875 12.2062L12 1L18.527 12.2062ZM12 17.4742L5.46875 13.4867L12 23L18.5312 13.4867L12 17.4742V17.4742Z" fill="gray"></path></svg>
                                        <h1 className="text-gray-500 text-sm sm:text-lg break-all">{dataUser?.walletAddress || "0x00a"}</h1>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="bg-[#1d0d3a]/50 py-6 px-6 sm:py-7 sm:px-9 rounded-xl sm:rounded-lg shadow-lg mb-10">
                    <h2 className="text-xl font-bold sm:font-semibold mb-4 text-purple-500">Edit Username</h2>
                    <div className="mb-7">
                        <label htmlFor="username" className="block text-sm text-gray-200 font-medium mb-3">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full p-3 text-gray-400 text-sm rounded bg-[#130b29] border border-purple-800/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your new username"
                        />
                    </div>
                    <button
                        onClick={() => onUpdateUsername()}
                        className="px-4 py-2 text-sm bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 
                         shadow-[0_0_5px_#a855f7] hover:from-purple-500 hover:via-purple-700 hover:to-purple-800 hover:shadow-[0_0_10px_#a855f7] text-white rounded transition">{updateUsernameIsLoading ? <LucideLoader2 className="animate-spin" /> : "Save Changes"}</button>
                </div>
            </div>
            <Footer />
        </main>
    );
}
