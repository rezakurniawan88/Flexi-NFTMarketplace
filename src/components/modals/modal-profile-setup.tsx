import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import useProfileStore from "@/stores/profileStore";
import { useEffect } from "react";
import { LucideLoader2 } from "lucide-react";

export default function ModalProfileSetup() {
    const { data: session, update } = useSession();
    const { modalSetupOpen, setModalSetupOpen } = useProfileStore((state) => state);
    const { toast } = useToast();

    const formSchema = z.object({
        username: z.string().min(2, { message: "Username must be at least 2 characters." }),
        email: z.string().email({ message: "Please enter a valid email address." }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
        },
    });

    const { mutate: onSetupProfile, isPending: setupIsLoading } = useMutation({
        mutationKey: ["setup-profile"],
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const response = await axiosInstance.post("/profile/setup", {
                username: values?.username,
                email: values?.email,
                walletAddress: session?.user?.walletAddress
            });
            return response?.data;
        },
        onSuccess: async (data) => {
            toast({
                title: "Setup Profile Success",
                description: data?.message,
                className: "bg-[#110823] text-gray-200 border border-purple-800/40",
            });
            await update({
                ...session,
                user: {
                    ...session?.user,
                    username: data?.username,
                    email: data?.email,
                    needProfileSetup: false
                }
            });
            setModalSetupOpen(false);
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
            console.log(error);
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSetupProfile(values);
    }

    useEffect(() => {
        if (session?.user?.username && session?.user?.email) {
            setModalSetupOpen(false);
        }
    }, [session, setModalSetupOpen])

    if (!session?.user?.needProfileSetup) {
        return null;
    }

    return (
        <Dialog open={modalSetupOpen}>
            <DialogContent className="max-w-[75%] sm:max-w-[40%] bg-[#0a0615] border border-slate-900 text-gray-200 [&>button]:hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl text-purple-300">Profile Setup</DialogTitle>
                    <DialogDescription className="text-gray-500">
                        To get started, please set up your profile. This will help us personalize your experience and provide better recommendations.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="w-full pt-2 pb-2 space-y-3" encType="multipart/form-data">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-xs text-purple-300 md:text-sm">Username<span className="pl-1 text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" className="text-xs md:text-sm py-5 border-purple-800/30 text-purple-200" {...field} autoFocus required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-xs text-purple-300 md:text-sm">Email<span className="pl-1 text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder="youremail@email.com" type="email" className="text-xs md:text-sm py-5 border-purple-800/30 text-purple-200" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} className="w-full py-[1.35rem] bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 
                         shadow-[0_0_5px_#a855f7] hover:from-purple-500 hover:via-purple-700 hover:to-purple-800 hover:shadow-[0_0_10px_#a855f7] text-white text-sm font-semibold rounded-lg md:mt-4">{setupIsLoading ? <LucideLoader2 className="animate-spin" /> : "Setup Profile"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
