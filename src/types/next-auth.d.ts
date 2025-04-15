// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    username?: string | undefined;
    email?: string | undefined;
    walletAddress: string;
    needProfileSetup: boolean;
  }
  
  interface Session {
    user: User & DefaultSession["user"];
  }
}