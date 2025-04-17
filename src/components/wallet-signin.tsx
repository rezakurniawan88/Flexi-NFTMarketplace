"use client"

import { axiosInstance } from "@/lib/axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { useConnectModal, ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import useProfileStore from "@/stores/profileStore";
import ModalProfileSetup from "./modals/modal-profile-setup";
import { LucideImage, LucideLoader2, LucideLogOut, LucideSettings, LucideUser2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import useFetchUserData from "@/hooks/useFetchUserData";

export default function WalletSignIn() {
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { openConnectModal } = useConnectModal();
    const { disconnect } = useDisconnect();
    const { data: session } = useSession();
    const { data: dataUser } = useFetchUserData();
    const { toast } = useToast();
    const { setModalSetupOpen } = useProfileStore((state) => state);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
    const acronymUser = dataUser?.username?.split(/\s+/g).slice(0, 2).map((word: string | number[]) => word[0]).join('').toUpperCase();

    const { mutate: handleSignIn, isPending: signIsLoading } = useMutation({
        mutationKey: ["signin"],
        mutationFn: async () => {
            if (!isConnected || !address) {
                openConnectModal?.();
                return;
            }

            if (session) return;

            const nonceResponse = await axiosInstance.post("/nonce", { walletAddress: address });
            const signature = await signMessageAsync({ message: `Nonce: ${nonceResponse?.data?.nonce}` });

            await signIn("wallet", {
                address,
                signature,
                nonce: nonceResponse.data.nonce,
                redirect: false
            });
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Sign Success",
                className: "bg-[#0a0615] text-gray-200 border border-purple-800/40",
            });
        },
        onError: (error) => {
            console.log("Sign in failed", error);
            toast({
                title: "Failed",
                description: "Signin failed",
                variant: "destructive"
            });
        }
    })

    useEffect(() => {
        if (session?.user?.needProfileSetup) {
            setModalSetupOpen(true);
        }
    }, [session, setModalSetupOpen]);

    const handleButtonClick = () => {
        if (!isConnected) {
            openConnectModal?.();
        } else if (isConnected && address && !session) {
            handleSignIn();
        }
    }

    const { mutate: handleLogout, isPending: logoutIsLoading } = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            await signOut({ redirect: false });
            disconnect();
        },
        onSuccess: () => {
            setIsLogoutModalOpen(false);
            toast({
                title: "Success",
                description: "Logout Success",
                className: "bg-[#110823] text-gray-200 border border-purple-800/40",
            });
        },
        onError: (error) => {
            console.log(error);
            toast({
                title: "Error",
                description: "Logout Error",
                variant: "destructive"
            });
        }
    })

    return (
        <div>
            <div className="flex items-center">
                <ConnectButton.Custom>
                    {({ account, chain, mounted }) => {
                        return (
                            <div
                                {...(!mounted && {
                                    "aria-hidden": true,
                                    "style": {
                                        opacity: 0,
                                        pointerEvents: "none",
                                        userSelect: "none",
                                    },
                                })}
                            >
                                {(() => {
                                    if (!mounted || !account || !chain || !session) {
                                        return (
                                            <button
                                                onClick={handleButtonClick}
                                                className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-[0_0_10px_#a855f7] py-3 px-4 sm:px-5 text-xs sm:text-sm rounded-lg text-white cursor-pointer hover:from-purple-500 hover:via-purple-700 hover:to-purple-800 min-w-[120px] flex items-center justify-center"
                                            >
                                                {signIsLoading ? <LucideLoader2 className="animate-spin" /> : isConnected && address ? "Sign" : "Connect Wallet"}
                                            </button>
                                        )
                                    }
                                    return (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-[0_0_10px_#a855f7] rounded-full text-white font-semibold hover:opacity-90 focus:outline-none hover:from-purple-500 hover:via-purple-700 hover:to-purple-800">
                                                    {acronymUser}
                                                </button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end" className="w-52 sm:w-64 bg-[#0a0615] dark:bg-gray-800 border border-gray-800 dark:border-gray-700 shadow-lg rounded-lg p-2">
                                                <DropdownMenuLabel className="flex flex-col gap-1">
                                                    <span className="text-sm sm:text-lg font-medium text-gray-300">
                                                        {session?.user?.username || "Guest"}
                                                    </span>
                                                    <span className="text-xs sm:text-sm text-gray-500">
                                                        {`${account?.displayName} (${account.displayBalance})` || "0x00"}
                                                    </span>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-gray-800" />

                                                <Link href="/profile?tabs=collectibles" passHref>
                                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-400 focus:bg-[#110b22] focus:text-gray-300 rounded-md p-2 text-xs sm:text-sm">
                                                        <LucideUser2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        <span>My Profile</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href="/profile?tabs=created" passHref>
                                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-400 focus:bg-[#110b22] focus:text-gray-300 rounded-md p-2 text-xs sm:text-sm">
                                                        <LucideImage className="w-4 h-4" />
                                                        <span>My NFTs</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                                <Link href="/profile/account-settings" passHref>
                                                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-gray-400 focus:bg-[#110b22] focus:text-gray-300 rounded-md p-2 text-xs sm:text-sm">
                                                        <LucideSettings className="w-4 h-4" />
                                                        <span>Settings</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator className="bg-gray-800" />
                                                <DropdownMenuItem
                                                    onClick={() => setIsLogoutModalOpen(true)}
                                                    className="flex items-center gap-2 cursor-pointer text-gray-400 focus:bg-[#110b22] focus:text-gray-300 rounded-md px-2 py-2 text-xs sm:text-sm"
                                                >
                                                    <LucideLogOut className="w-4 h-4 text-red-500" />
                                                    <span className="text-red-500">Logout</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    );
                                })()}
                            </div>
                        );
                    }}
                </ConnectButton.Custom>
            </div>
            <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
                <DialogContent className="w-4/5 sm:w-full bg-[#0a0615] border border-slate-900 text-gray-200 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-300">Logout</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Are you sure you want to logout?</DialogDescription>
                    <div className="flex justify-end gap-4 mt-4">
                        <button onClick={() => setIsLogoutModalOpen(false)} className="mr-2 text-sm sm:text-base">Cancel</button>
                        <Button onClick={() => handleLogout()} className="bg-gradient-to-br from-red-400 via-red-600 to-red-800 shadow-[0_0_4px_#f87171] hover:shadow-[0_0_8px_#f87171] text-white px-4 py-2 rounded" disabled={logoutIsLoading}>
                            <div className="flex justify-center items-center gap-2 text-sm sm:text-base">
                                <h1>Logout</h1>
                                {logoutIsLoading ?
                                    <LucideLoader2 className="animate-spin" /> : null}
                            </div>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <ModalProfileSetup />
        </div>
    )
}
