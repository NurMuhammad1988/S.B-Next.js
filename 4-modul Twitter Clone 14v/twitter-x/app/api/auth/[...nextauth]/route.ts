import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth/next";

const handler  = NextAuth(authOptions)

export {handler as GET, handler as POST}//ham GET ham POST qilib so'rov jo'natiladi yani bu nextauthni asosiy nastroykasi hissoblanadi bu authOptions