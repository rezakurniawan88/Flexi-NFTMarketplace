"use client"

import { useForm } from "react-hook-form";
import Header from "@/components/header";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAccount, useSignMessage, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { NFTMarketplaceABI } from "@/utils/abi/NFTMarketplaceABI";
import { ethers } from "ethers";
import { LucideLoader2, LucideXCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { sepolia } from "viem/chains";
import { axiosInstance } from "@/lib/axios";

export default function CreateNFTPage() {
    const { isConnected } = useAccount();
    const { data: hash, writeContract } = useWriteContract();
    const { isLoading: isWaitingForTransaction, isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
        hash: hash,
        chainId: sepolia.id,
        confirmations: 1
    });
    const [createNFTIsLoading, setCreateNFTIsLoading] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const priceRef = useRef<HTMLParagraphElement>(null);
    const { signMessageAsync } = useSignMessage();

    const formSchema = z.object({
        nftImage: z.custom<FileList>()
            .refine((files) => files?.length >= 1, {
                message: "Required file"
            })
            .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, {
                message: "File too large (max 5MB)",
            }),
        title: z.string().min(2, { message: "Title must be at least 2 characters." }),
        description: z.string().min(2, { message: "Description must be at least 2 characters." }),
        price: z.coerce.number(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nftImage: undefined,
            title: "",
            description: "",
            price: 0,
        },
    });

    useEffect(() => {
        const subscription = form.watch((value) => {
            if (value.nftImage && value.nftImage[0]) {
                const file = value.nftImage[0];
                setPreviewImage(URL.createObjectURL(file));
            } else {
                setPreviewImage(null);
            }
            if (titleRef.current) {
                titleRef.current.textContent = value.title || "Title";
            }
            if (priceRef.current) {
                priceRef.current.textContent = `${value.price || 0} ETH`;
            }
        });
        return () => subscription.unsubscribe();
    }, [form]);

    const handleMint = async (values: z.infer<typeof formSchema>) => {
        setCreateNFTIsLoading(true);
        try {
            if (!isConnected) {
                toast({
                    title: "Error",
                    description: "Wallet not connected",
                    variant: "destructive",
                })
                throw new Error("Wallet not connected")
            }

            await signMessageAsync({ message: "Confirm NFT minting" })

            const formData = new FormData();
            formData.append("file", values.nftImage[0]);

            const imageURI = await axiosInstance.post("/ipfs/upload-file-to-ipfs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }).then((res) => {
                return res?.data?.ipfsHash
            });

            if (!imageURI) {
                throw new Error("Failed to upload image to IPFS")
            }

            const metadata = {
                name: values.title,
                description: values.description,
                image: imageURI,
            }

            const metadataURI = await axiosInstance.post("/ipfs/upload-json-to-ipfs", { metadata }).then((res) => {
                return res?.data?.ipfsHash
            })

            if (!metadataURI) {
                throw new Error("Failed to upload metadata to IPFS")
            }

            await writeContract({
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi: NFTMarketplaceABI,
                functionName: "createNFT",
                args: [metadataURI, ethers.parseEther(values.price.toString())],
                chainId: sepolia.id
            });


        } catch (error) {
            console.log(error);
            toast({
                title: "Error create NFT",
                description: "Failed to create NFT",
                variant: "destructive",
            });
            setCreateNFTIsLoading(false);
        }
    }

    useEffect(() => {
        if (isTransactionSuccess) {
            setCreateNFTIsLoading(false);
            router.push("/profile");
            toast({
                title: "NFT Created Successfully",
                description: "Your NFT has been created successfully",
                className: "bg-[#110823] text-gray-200 border border-purple-800/40",
            });
        }
    }, [isTransactionSuccess, router, toast]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        handleMint(values);
    }

    return (
        <main className="bg-darkprimary pt-20">
            <Header />
            <div className="w-full flex flex-col sm:flex-row">
                <div className="w-full sm:w-3/5 pt-8 sm:pt-10 pl-8 pr-8 sm:pr-0 sm:pl-24 pb-16">
                    <h1 className="font-bold text-2xl sm:text-3xl mb-5 text-purple-500">Create NFT</h1>
                    <Form {...form}>
                        <form className="w-full pt-2 pb-2 space-y-3" encType="multipart/form-data">
                            <FormField
                                control={form.control}
                                name="nftImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-xs md:text-sm text-purple-500">Upload Image<span className="pl-1 text-red-500">*</span></FormLabel>
                                        <p className="pb-2 text-sm text-gray-500">Drag or choose your file to upload</p>
                                        <FormControl>
                                            <label className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-[#110a24] hover:bg-[#1a0f38] hover:shadow-[0_0_5px_#a855f7]">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <Input type="file" className="hidden" onChange={(e) => field.onChange(e.target.files)} />
                                            </label>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <h1 className="text-base sm:text-lg font-bold pt-8 text-purple-500">Items Details</h1>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-xs md:text-sm text-purple-300">TITLE<span className="pl-1 text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="NFT Title" className="text-xs md:text-sm py-5 border-purple-800/30 text-gray-400" {...field} autoFocus required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-xs md:text-sm text-purple-300">DESCRIPTION<span className="pl-1 text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='e.g "The theme of this nft is retro futuristic ..."' className="text-xs md:text-sm py-5 border-purple-800/30 text-gray-400" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-xs md:text-sm text-purple-300">PRICE (ETH)<span className="pl-1 text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="NFT Price" type="number" className="text-xs md:text-sm py-5 border-purple-800/30 text-gray-400" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                        <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="w-full py-[1.35rem] bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 
                         shadow-[0_0_5px_#a855f7] hover:shadow-[0_0_15px_#a855f7] text-white text-sm font-semibold rounded-lg hover:bg-gray-900 mt-4" disabled={createNFTIsLoading || isWaitingForTransaction}>{createNFTIsLoading || isWaitingForTransaction ? <LucideLoader2 className="animate-spin" /> : "Create"}</Button>
                    </Form>
                </div>
                <div className="w-[85%] sm:w-[25%] px-10 pt-10 pb-16 ml-8 sm:ml-28 mt-0 sm:mt-24 mb-12 sm:mb-0 h-screen border border-purple-800/30 rounded-2xl">
                    <h1 className="font-bold text-2xl mb-8 text-purple-500">Preview</h1>
                    <div
                        className="image h-72 bg-[#110823] backdrop-blur-lg border border-purple-800/20 mb-4 rounded-xl"
                        style={{
                            backgroundImage: previewImage ? `url(${previewImage})` : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="space-y-2">
                        <h3
                            ref={titleRef}
                            className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent [text-shadow:_0_0_15px_#a855f730] truncate"
                        >
                            Title
                        </h3>
                        <p className="text-xs sm:text-sm text-purple-200/80 mt-1 truncate">0x1234567890abcdefghijklmnopqrstuvwxyz</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs text-purple-300/60">Current Price</p>
                        <p ref={priceRef} className="text-base sm:text-lg font-semibold text-purple-300">0 ETH</p>
                    </div>
                    <button onClick={() => form.reset()} className="flex items-center gap-2 mt-8 py-2.5 px-5 font-semibold text-xs text-gray-500 border border-purple-800/30 rounded-md hover:bg-[#130b27]">
                        <LucideXCircle className="w-4 h-4" /> Clear all</button>
                </div>
            </div>
        </main>
    )
}
