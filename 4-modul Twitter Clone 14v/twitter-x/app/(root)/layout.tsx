import Auth from "@/components/auth";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "@/components/sidebar/sidebar";
import FollowBar from "@/components/shared/follow-bar";
//bu server component bu componentda react hooklar bilan ishlab bo'lmaydi
//bosh sahifaga kirgandan keyin hamma narsa shu layoutdan o'tadi

//asosiy sahifa

interface Props {
    children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
    //bu ts shu sabab componentgaham nima ekanligini typi aytib qo'yilish kerak bu layoutda children ishlatiladi shusabab typi aytib qo'yilgan interfaceda yani reactnode elementlar
    const session: any = await getServerSession(authOptions); //nextauthni server bilan ishlaydigan functioni

    // console.log(session.currentUser);

    if (!session) {
        //yani agar session yo'q bo'lsa yani session o'zgaruvchidagi getServerSession bilan chaqirilgan authOptions false bo'lsa yani user ro'yhatdan o'tish jaroyonini tugatmagan bo'lsa yani authOptions functioni ishlab turgan  bo'lsa Auth pageni return qiladi auth pageda esa loginmodal registermodallar chaqirilgan shunda authdagi return ishga tushib user royhatdan o'tishi kerak bo'lgan sahifa yana actual qoladi yokida pastdagi returnni qaytaradi yaniasosiy sahifaga olib chiqadi yani session strue bo'lsa yani user ro'yhatdan o'tib bo'lgan yoki login paswwordlarni togri kiritgan bo'lsa pastdagiu return aftamatik tarzda ishlab userni asosiy sahifaga olib chiqadi
        return (
            <div className="container h-screen mx-auto max-w-7xl">
                <Auth />
            </div>
        );
    }

    // console.log(session);

    return (
        <div className="lg: container h-screen mx-auto lg: max-w-7xl">
            <div className="flex">
                <Sidebar
                    user={JSON.parse(JSON.stringify(session.currentUser))}
                    // sidebar.tsxdagi sidebar-accoun.tsxda chaqirilga serverdan keladigan userni datalarini jsonfailga o'girvoldik
                />
                <div className="flex flex-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1">
                    <div className="w-full">
                        <NextTopLoader
                            //nextni rodnoy loaderi tepadan yuradigan
                            color="#2299DD"
                            initialPosition={0.08}
                            crawlSpeed={200}
                            height={3}
                            crawl={true}
                            showSpinner={true}
                            easing="ease"
                            speed={200}
                            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                        />
                        {children}
                        <Toaster />
                    </div>
                </div>

                <FollowBar />
                {/* fallowbar userlar turadigan o'ng tomondagi bar */}
            </div>
        </div>
    );
};

export default Layout;
