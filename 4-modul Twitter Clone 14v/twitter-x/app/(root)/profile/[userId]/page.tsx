import ProfileBio from "@/components/profile/profile-bio";
import ProfileHero from "@/components/profile/profile-hero";
import Header from "@/components/shared/header";
import PostFeed from "@/components/shared/post-feed";
import { getUserById } from "@/lib/actions/user.action";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import React from "react";

//next 13 da umumiy tushuncha apilar apilarni dynamic qilish[]lar uchun route.ts default ishlatiladi yani defaul nomi shunday yani next tanib olishi uchun shunday nom berilishi shart

//next 13 da umumiy tushuncha  (root) root yani ildiz papaklar uchun va [dynam,ic aidilar uchun] layoutga aloqador faillar uchun page.tsx yokida jsx yoziladi yani shudna next taniydi buni root va yoki ui ekanligini

//bu server rendering (SSR) fail vqa imkon qadar kamroq narsani rendring qilish kerak chunki server qiynalib datalar sekin kelishi mumkun

const Page = async ({ params }: { params: { userId: string } }) => {
    const session: any = await getServerSession(authOptions);
    const user = await getUserById(params.userId);
    console.log(user);

    return (
        <>
            <Header label={user.name} isBack />
            <ProfileHero user={JSON.parse(JSON.stringify(user))} />
            {/* user={JSON.parse(JSON.stringify(user) json qilinganini sababi user serverdan kelayotgani uchun???????????  */}
            <ProfileBio
                user={JSON.parse(JSON.stringify(user))}
                userId={JSON.parse(JSON.stringify(session)).currentUser._id}
            />

            <PostFeed
                userId={params.userId}
                user={JSON.parse(JSON.stringify(session.currentUser))}
            />
        </>
    );
};

export default Page;
