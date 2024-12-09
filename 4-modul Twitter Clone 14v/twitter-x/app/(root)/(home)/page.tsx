// next 14 faillar structurasi (root) bu ildiz papka degani yani next js asosiy sahifani shunday izlaydi agar app papkani ichida page.tsx file bo'lmasa next (root)ni ichidan (home)ni ichidan page.tsxni topib asosiy sahifa qiladi next jsda bu ()structura funksiyasi yozilgan 

//bu asosiy sahifa
"use client";
import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import PostItem from "@/components/shared/post-item";
import { IPost } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";//useSession() NextAuth-da useSession() React Hook. js mijozi kimdir tizimga kirganligini tekshirishning eng oson usuli . Bu sahifalar/_ilovaga <Provayder> qo'shilsa yaxshi ishlaydi.

import { useEffect, useState } from "react";
// import { authOptions } from "@/lib/auth-options";//server component
// import { getServerSession } from "next-auth";//server component

// import Auth from "@/components/auth";
// export default function Page() {
//     const user = false;
//     if (!user) {//agar user false bo'lsa aslida if else true bilan ishlaydi ! bu esa trueni false qiladi shu sabab (!user) degani agar user false bo'lsa degani hissoblanadi
//         //agar user yo'q bo'lsa yani false bo'lsa Auth componentga otvoradi lekun user yo'q chunki yuqorida false qilingan shu sabab aftamatik tarzda auth pagega jo'natadi Auth pageda esa user create qilinmasdan oldin chiqadigan user account ochishi mumkun bo'lgan sahifa bor va u Auth sahifada  auth uchun mongoDBda qilingan modellar bor shu modellar sabab user account create qiloladi agar user haliaccount create qilmagan bo'lsa bu kod userni Auth sahifaga otvoradi
//         return <Auth />;
//     }

//     return <div>Page</div>;
// }

/////////////////////////////////////////////////////////////////////
export default function Page() {
    // const session: any = await getServerSession(authOptions);//server component
    // bu componentni servermas client component qilinishi sababiserverdan datalar ko'p kelsa server uchun og'irlashib ketmasligi uchun client component bo'lganda yuklash clientni browseri tomonidan bo'ladi
    const { data: session, status }: any = useSession();//NextAuth.js client side rendreingda useSession() React Hook kimdir tizimga kirganligini tekshirishning eng oson usuli hisoblanadi//usesessionda data nomli o'zgaruvchi yaratilib session status nomli qiymatlar berildi va typi any qilindi endi sessionda va statusda usestatus hooki bor
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<IPost[]>([]);//endi postsa iPOST BIR IPOSTDA ESA USER YOZGAN Postni typlari va userni id bilan aniqlash bor yani qaysi user yozgan postligini aniqlash bor

    useEffect(() => {//yani asosiy sahifaga userlar kirganda birinchi ishlaydigan function 
        const getPosts = async () => {//getPosts async chunki so'rov jo'natadi try catch bilan
            try {
                setIsLoading(true);//isloading function boshida false edi endi true qilindi chunki axios ishlagancha loading holati sodir bo'ladi
                const { data } = await axios.get("/api/posts?limit=10");//axios get qiladi api papkani ichidagi posts papkani ichidagi route.ts ichidan keletgan postlarni query so'rov bilan 10 ta ohirgi postni get qiladi
                setPosts(data);//va setpostsga datani yani axiosni metodlarini typlari bor datani ichida ipost interface bor setPosts statega qo'yib get qiladi va 
                setIsLoading(false);//isloadingni false qiladi chunki get qilib bo'indi endi jsxda isloadingda chaqirilgan loader2 false bo'ladi endi loader ishlamaydi chunki get qilibb bo'lindi//setisloading bo'sh edi endi bu ham isloading kabi  false bo'ldi
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        getPosts();
    }, []);

    return (
        <>
        {/* bu (home) page yani bosh sahifa header jsx ichida birinchi chaqirildi yani eng yuqorida turishi uchun */}
            <Header label="Home" />
            {/* header shared papkani ichidagi header.tsxdan kelepti labeli dynamic yani faqat string qabul qiladi */}
            {isLoading || status === "loading" ? (//ststusda usesession bor yani user bor yo'qligini tekshirish bor va isloading bor bo'lsa va userni bor yo'qligi loading holatida yani tekshirialyotgan holatda bo'lsa va bular true bo'lsa///////isloading true bo'lsa va statusi loading bo'ladigan bo'lsa shu loader2ni chiqar yokida pastdagi form componenrtni va postsni map bilan copy qilib PostItemga jo'nat  Form componentda esa userni datalari bor postitemda esa postni datalari bor yabni kim  yozgan like bormi va hakozo
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="animate-spin text-sky-500" />
                </div>
            ) : (
                <>
                    <Form
                        placeholder="What's on your mind?"//bu placeholder form.tsxda txtareani ichida dynamic yozib qo'yilgan faqat string qabul qiladi "What's on your mind?" texti esastring shu sabab hatosisiz ishlepti
                        user={JSON.parse(JSON.stringify(session.currentUser))}//form.tsxda userga IUser typi berilgan bu iserda mongodbdan keletgan user bor mongodbdan keletgan userni Form tanimeydi shu sabab parse ja stringfy bilan jsonni string qivolindi
                        setPosts={setPosts}
                    />

                    {posts.map((post) => (
                        <PostItem
                            key={post._id}
                            post={post}
                            user={JSON.parse(JSON.stringify(session.currentUser))}
                            setPosts={setPosts}
                        />
                    ))}
                </>
            )}
        </>
    );
}
