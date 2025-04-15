import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import { ethers } from "ethers"

export const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            id: "wallet",
            name: "wallet",
            credentials: {
                address: { label: "Address", type: "text" },
                signature: { label: "Signature", type: "text" },
                nonce: { label: "Nonce", type: "text" },
            },
            async authorize(credentials) {
                try {
                    const recoveredAddress = ethers.verifyMessage(
                        `Nonce: ${credentials?.nonce}`,
                        credentials?.signature || ""
                    );

                    if(recoveredAddress.toLowerCase() !== credentials?.address?.toLowerCase()) {
                        throw new Error("Invalid signature");
                    }

                    const lowercaseAddress = recoveredAddress.toLowerCase();

                    let user = await prisma.user.findUnique({
                        where: { walletAddress: lowercaseAddress },
                    });

                    if(!user) {
                        user = await prisma.user.create({
                            data: { walletAddress: lowercaseAddress }
                        });
                    }

                    return {
                        id: user.id.toString(),
                        username: user.username || undefined,
                        email: user.email || undefined,
                        walletAddress: user.walletAddress || "",
                        needProfileSetup: user.needProfileSetup
                    };
                } catch (error) {
                    console.log("Authorization error", error);
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({token, user, account, trigger, session}) {
            if(trigger === "update" && session?.user) {
                return { token, ...session.user }
            }
            if(user && account) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    walletAddress: user.walletAddress,
                    needProfileSetup: user.needProfileSetup
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as string,
                username: token.username as string | undefined,
                email: token.email as string,
                walletAddress: token.walletAddress as string,
                needProfileSetup: token.needProfileSetup as boolean,
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/login",
    },
}