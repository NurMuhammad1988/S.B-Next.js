import { AuthOptions } from "next-auth";
import { connectToDatabase } from "./mongoose";
import User from "@/database/user.model";
import GitHubProvider from "next-auth/providers/github"; 
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        ////////////////////
        CredentialsProvider({//providerda email va pasword bilan yani pramoy google va github bilanmas oddiy sign qilib email va paswordlarni user qo'lda kiritmoqchi bo'lganda ishlaydigan function bu nextauthdan keladi
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToDatabase();

                const user = await User.findOne({
                    email: credentials?.email,
                });

                return user;
            },
        }),
        ////////////////////////
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),




        //////////////////////
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }: any) {
            console.log(session);// github bilan registratsa qilingandauserni github accounti parametrlari keladi va bu logdagi function bo'lgani uchun browserda ko'rinmaydi faqat local codeeditorda ko'rinadi chunkiserver datalarni browserda qoldirish nextda mumkun emas faqat terminalda ko'rish mumkun

            await connectToDatabase();//connectToDatabase bilan server bilan nextauth ulandi yani nextauth shu connectToDatabaseda yozilgan mongodbdagi server uchun ishlaydi pastdagi secret keylar sabab ishlaydi

            const isExistingUser = await User.findOne({
                email: session.user.email,
            });

            if (!isExistingUser) {//isExistingUser false bo'lsa yani isExistingUserda findOne bilan chaqirilgan User modelda email bo'lmasa nevUser o'zgaruvchi bilan yangi user create qilinadi yani yana mongodbni ishlatish uchun chaqirilgan mongoose kutubhonasini create metodi bilan email name va profileimage qarab yangi user  yaratiladi
                const newUser = await User.create({
                    email: session.user.email,
                    name: session.user.name,
                    profileImage: session.user.image,
                });

                session.currentUser = newUser;
            }

            session.currentUser = isExistingUser;

            return session;
        },
    },

    // debug: process.env.NODE_ENV === "development",??????????????????
    session: { strategy: "jwt" },//JWT Session Token cookie-faylida saqlanadi, xuddi shu cookie ma'lumotlar bazasi seanslari bilan tokenlar uchun ishlatiladi auth-optons.tsda chaqirib ishlatilgan agar bu authOptions bu joyda chaqirilmaganda  auth-options.tsxda ishlamagan bo'lardi bu nextauth google va github profil bilan parolsiz loyihaga kirish uchun ishlatildi nextauthni vazifasi shu faceebook va yana bir qancha katta saytlar accountlari bilan saytlarda ro'yhatdan o'tishga kerak bo'ladigan next.jsni o'zini shaxsiy kodlari masalan dasturchi ozi qilaman desa bu ish juda qiyin lekin nextauthda oson va tayyor
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET!,
    },
    secret: process.env.NEXTAUTH_SECRET!,
};
