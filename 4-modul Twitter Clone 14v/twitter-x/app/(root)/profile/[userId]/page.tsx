import ProfileBio from "@/components/profile/profile-bio";
import ProfileHero from "@/components/profile/profile-hero";
import Header from "@/components/shared/header";
import PostFeed from "@/components/shared/post-feed";
import { getUserById } from "@/lib/actions/user.action";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import React from "react";

//server component  "use client" yozilmagan

//next 13 da umumiy tushuncha apilar apilarni dynamic qilish[]lar uchun route.ts default ishlatiladi yani defaul nomi shunday yani next tanib olishi uchun shunday nom berilishi shart

//next 13 da umumiy tushuncha  (root) root yani ildiz papaklar uchun va [dynam,ic aidilar uchun] layoutga aloqador faillar uchun page.tsx yokida jsx yoziladi yani shudna next taniydi buni root va yoki ui ekanligini

//bu server rendering (SSR) fail va imkon qadar kamroq narsani rendring qilish kerak chunki server qiynalib datalar sekin kelishi mumkun`

const Page = async ({ params }: { params: { userId: string } }) => {
    const session: any = await getServerSession(authOptions);
    const user = await getUserById(params.userId);//lib/actions/user.action.tsdan keletgan function yani server side rendring faildan keletgan function//(params.userId) params bilan shu functiondan chaqirildi
    //userId getUserById functionida mongooseni findById functionida chaqirilgan userId bu userId getUserById functionidan params bilan chaqirildi chunki getUserById functionni ichidagi function findByIdni parametrida turgan itemlar shunday params keyi bilan chaqiriladi yani function va function ichidagi functionni parametrlari shunday chaqiriladi 
    console.log(user);//serverda yani faqat terminalda ko'rinadi logda browserda ko'rinmeydi chunki userni next jsni actions papkasi ichida user.actions.tsdagi getUserById functioni bilan chaqirdik bu hafsiz hissoblanadi yani browserga hujum bo'lsa browserda userni datalari yo'q bo'ladi hack qilinmeydi
    //yani user contentni ko'rishdan oldim so'rov yuborish shusabab loaderham kerakemas//

    return (
        <>
            <Header label={user.name} isBack />
            <ProfileHero user={JSON.parse(JSON.stringify(user))} />
            {/* ProfileHero componentga userni json qilib jo'natish chunki user serverdan rendring bo'lib kelepti serverdan keltgan failni js tanimaydi shu sabab json qilish kerak */}
            
            <ProfileBio
                user={JSON.parse(JSON.stringify(user))}
                userId={JSON.parse(JSON.stringify(session)).currentUser._id}//session o'zgaruvchida kelgan next authni getServerSession functioni sabab olib kelinadigan _idni currentUser 
            />

            <PostFeed
                userId={params.userId}//endi postfeed component userId nomli qiymat qabul qiladi ichida string typli userIdlar bor
                user={JSON.parse(JSON.stringify(session.currentUser))}//endi postfeed component user nomli qiymat qabul qiladi bu user qiymati ichida session o'zgaruvchi bilan chaqirilib ichiga tushgan narsani json formatga o'girib olib currentUser nomli bo'sh o'zgaruvchiga soladi vazifasi shu yani currentUserga tushgan userni json qiladi????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            />
        </>
    );
};

export default Page;
